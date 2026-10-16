// AI helper backend for the "Differensial tenglamalar" study app.
// The Android app sends a small request (mode, language, topic, the lesson passage and the student's text);
// this server adds the API key, calls the model and returns plain text. The key never leaves the server.
//
// Environment (see .env.example):
//   ANTHROPIC_API_KEY   required — never commit it, never put it in the app
//   AI_MODEL            default claude-opus-5-5 (check current ids/prices on the official docs before deploying)
//   AI_EFFORT           default low  (short tutoring answers)
//   PORT                default 8787
//   APP_TOKEN           optional shared token the app sends in X-App-Token (an obstacle, not a secret: it ships in the APK)
//   RATE_PER_MIN        default 6 requests per minute per client IP
//   RATE_PER_DAY        default 120 requests per day per client IP
//   DAILY_REQUEST_CAP   default 2000 requests per day for the whole server (cost guard)
//   TRUST_PROXY         set to 1 only behind a trusted proxy that overwrites X-Forwarded-For
import http from 'node:http';
import { readFileSync } from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';

/* ---------- local development environment ---------- */
// Node does not read .env files automatically when started as `node server.js`.
// Load backend/.env for local use, while keeping real host environment variables authoritative.
function loadLocalEnv() {
  if (process.env.DT_SKIP_ENV_FILE === '1') return;
  try {
    const text = readFileSync(new URL('.env', import.meta.url), 'utf8');
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!m || process.env[m[1]] !== undefined) continue;
      let value = m[2].trim();
      if (value.length >= 2 && ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))) value = value.slice(1, -1);
      process.env[m[1]] = value;
    }
  } catch (e) {
    if (!e || e.code !== 'ENOENT') console.warn('Could not read backend/.env:', e && e.message ? e.message : e);
  }
}
loadLocalEnv();

const PORT = +(process.env.PORT || 8787);
const MODEL = process.env.AI_MODEL || 'claude-opus-5-5';
const EFFORT = process.env.AI_EFFORT || 'low';
const APP_TOKEN = process.env.APP_TOKEN || '';
const RATE_PER_MIN = +(process.env.RATE_PER_MIN || 6);
const RATE_PER_DAY = +(process.env.RATE_PER_DAY || 120);
const DAILY_CAP = +(process.env.DAILY_REQUEST_CAP || 2000);
const TRUST_PROXY = /^(1|true|yes)$/i.test(process.env.TRUST_PROXY || '');
// The app can legitimately send ~20 KB when lesson context, a solution and short history are all present.
const MAX_BODY = 32 * 1024;
const LANGS = { uz: 'Uzbek (Latin script)', ru: 'Russian', en: 'English' };
const MODES = ['explain', 'hint', 'check', 'ask'];

const hasKey = !!(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
const client = hasKey ? new Anthropic({ maxRetries: 2, timeout: 60_000 }) : null;

/* ---------- rate limiting (in memory; use a shared store if you run several instances) ---------- */
const perIp = new Map();
let day = new Date().toISOString().slice(0, 10), dayCount = 0;
function allow(ip) {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) { day = today; dayCount = 0; perIp.clear(); }
  if (dayCount >= DAILY_CAP) return 'server_daily_cap';
  const now = Date.now();
  const r = perIp.get(ip) || { min: [], day: 0 };
  r.min = r.min.filter(t => now - t < 60_000);
  if (r.min.length >= RATE_PER_MIN) return 'rate_minute';
  if (r.day >= RATE_PER_DAY) return 'rate_day';
  r.min.push(now); r.day++; perIp.set(ip, r); dayCount++;
  return null;
}

function clientIp(req) {
  if (TRUST_PROXY) {
    const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    if (forwarded) return forwarded;
  }
  return req.socket.remoteAddress || '?';
}

/* ---------- prompt ---------- */
const SYSTEM = `You are a patient tutor inside an offline study app for the university course "Differential Equations" (MAT203, 4th semester, students of computer, software and cybersecurity engineering).
Rules:
- Answer only about the course mathematics (ODEs, systems, numerical methods, PDEs, Laplace transform) and how to study it. Politely decline anything else.
- Write in the language requested. Use the course terminology. Put formulas in LaTeX between $...$ (inline) or $$...$$ (display).
- Be correct about hypotheses: state exact conditions of theorems, the interval where a solution exists, solutions lost when dividing, ln|y|, general vs particular vs singular solutions, order vs degree, the two meanings of "homogeneous", initial vs boundary conditions, and numerical error/stability.
- PDE classification convention in this course: a u_xx + 2b u_xy + c u_yy, discriminant b^2 - a c.
- Never claim you can solve every equation. If a method does not apply, say so and suggest what to check.
- If you are not sure, say so briefly. Do not invent book page numbers or citations.
- Keep answers short: at most about 180 words unless the student asks for more.`;

const MODE_TEXT = {
  explain: 'Explain the given passage in simpler words, with one small worked illustration if useful.',
  hint: 'Give ONE hint for the next step only. Do not give the final answer or the full solution.',
  check: 'Check the student\'s solution step by step. Say which step is the first wrong one and why, or confirm it is correct and suggest how to verify by substitution. Do not rewrite the full solution unless it is already correct.',
  ask: 'Answer the student\'s question.'
};

function clip(s, n) { s = typeof s === 'string' ? s : ''; return s.length > n ? s.slice(0, n) + '…' : s; }

function buildMessages(b) {
  const lang = LANGS[b.lang] ? b.lang : 'uz';
  const parts = [];
  parts.push(`Answer language: ${LANGS[lang]}.`);
  parts.push(`Task: ${MODE_TEXT[b.mode]}`);
  if (b.exam) parts.push('The student is in exam mode: give only a short hint, never the answer.');
  if (b.topic) parts.push(`Topic: ${clip(b.topic, 200)}`);
  if (b.context) parts.push(`Course material (from the app):\n<material>\n${clip(b.context, 4000)}\n</material>`);
  if (b.exercise) parts.push(`Exercise:\n<exercise>\n${clip(b.exercise, 2000)}\n</exercise>`);
  if (b.solution) parts.push(`Student's solution:\n<solution>\n${clip(b.solution, 3000)}\n</solution>`);
  if (b.question) parts.push(`Student's question: ${clip(b.question, 1000)}`);
  const msgs = [];
  // short history (last 3 exchanges) so follow-up questions work; the app sends only what it shows on screen
  (Array.isArray(b.history) ? b.history.slice(-6) : []).forEach(m => {
    if ((m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string' && m.text.trim()) msgs.push({ role: m.role, content: clip(m.text, 1500) });
  });
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  if (msgs.length && msgs[msgs.length - 1].role === 'user') msgs.pop();
  msgs.push({ role: 'user', content: parts.join('\n\n') });
  return msgs;
}

async function callModel(b) {
  const params = {
    model: MODEL,
    max_tokens: 2000,
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: buildMessages(b),
    output_config: { effort: EFFORT },
  };
  // On a policy decline the API can re-run the request on a recommended fallback model (beta, Claude API only).
  const useFallback = process.env.AI_FALLBACKS !== 'off';
  const res = useFallback
    ? await client.beta.messages.create({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' })
    : await client.messages.create(params);
  if (res.stop_reason === 'refusal') return { ok: false, error: 'refusal' };
  const text = res.content.filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
  return { ok: true, text, truncated: res.stop_reason === 'max_tokens' };
}

/* ---------- HTTP ---------- */
function send(res, code, obj) {
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',            // the app runs from file:// (origin "null"); no cookies are used
    'Access-Control-Allow-Headers': 'Content-Type, X-App-Token',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  const url = new URL(req.url, 'http://x');
  if (req.method === 'GET' && url.pathname === '/health') return send(res, 200, { ok: true, configured: hasKey, model: hasKey ? MODEL : null });
  if (req.method !== 'POST' || url.pathname !== '/api/ai') return send(res, 404, { ok: false, error: 'not_found' });
  if (APP_TOKEN && req.headers['x-app-token'] !== APP_TOKEN) return send(res, 401, { ok: false, error: 'token' });

  let size = 0; const chunks = []; let tooLarge = false;
  req.on('data', c => {
    if (tooLarge) return;
    size += c.length;
    if (size > MAX_BODY) { tooLarge = true; chunks.length = 0; }
    else chunks.push(c);
  });
  req.on('end', async () => {
    if (tooLarge) return send(res, 413, { ok: false, error: 'body_too_large' });
    let b;
    try { b = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { return send(res, 400, { ok: false, error: 'bad_json' }); }
    if (!b || typeof b !== 'object' || Array.isArray(b)) return send(res, 400, { ok: false, error: 'bad_body' });
    if (!MODES.includes(b.mode)) return send(res, 400, { ok: false, error: 'bad_mode' });
    if (!hasKey) return send(res, 503, { ok: false, error: 'not_configured' });
    const lim = allow(clientIp(req)); if (lim) return send(res, 429, { ok: false, error: lim });
    try {
      const out = await callModel(b);
      // no content logging: only an anonymous counter line
      console.log(new Date().toISOString(), b.mode, b.lang, out.ok ? 'ok' : out.error);
      send(res, out.ok ? 200 : 422, out);
    } catch (e) {
      const status = e && e.status;
      console.error(new Date().toISOString(), 'upstream error', status || '', e && e.name);
      send(res, status === 429 ? 429 : 502, { ok: false, error: status === 429 ? 'upstream_busy' : 'upstream' });
    }
  });
});

if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  server.listen(PORT, () => console.log(`AI backend on :${PORT} — ${hasKey ? 'model ' + MODEL : 'NOT CONFIGURED (no API key): /api/ai returns 503'}`));
}
export { server, buildMessages, allow };