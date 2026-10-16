// Offline tests: no API key needed. Checks validation, not-configured behavior, exam prompting and rate limiting.
import assert from 'node:assert';
process.env.DT_SKIP_ENV_FILE = '1';
delete process.env.ANTHROPIC_API_KEY; delete process.env.ANTHROPIC_AUTH_TOKEN;
const { server, buildMessages, allow } = await import('./server.js');
await new Promise(r => server.listen(0, r));
const base = 'http://127.0.0.1:' + server.address().port;

const h = await (await fetch(base + '/health')).json();
assert.equal(h.configured, false);

const post = body => fetch(base + '/api/ai', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body
});

const badJson = await post('{');
assert.equal(badJson.status, 400);
assert.equal((await badJson.json()).error, 'bad_json');

const nullBody = await post('null');
assert.equal(nullBody.status, 400);
assert.equal((await nullBody.json()).error, 'bad_body');

const badMode = await post(JSON.stringify({ mode: 'solve-everything', lang: 'uz' }));
assert.equal(badMode.status, 400);
assert.equal((await badMode.json()).error, 'bad_mode');

const oversized = await post(JSON.stringify({ mode: 'hint', lang: 'uz', context: 'x'.repeat(40 * 1024) }));
assert.equal(oversized.status, 413);
assert.equal((await oversized.json()).error, 'body_too_large');

const r1 = await post(JSON.stringify({ mode: 'hint', lang: 'uz' }));
assert.equal(r1.status, 503);

const m = buildMessages({ mode: 'check', lang: 'ru', topic: 't02', solution: 'y=Ce^x', history: [{ role: 'assistant', text: 'x' }, { role: 'user', text: 'q' }, { role: 'assistant', text: 'a' }] });
assert.equal(m[0].role, 'user'); assert.equal(m[m.length - 1].role, 'user');
assert.ok(m[m.length - 1].content.includes('Russian'));

const exam = buildMessages({ mode: 'hint', lang: 'uz', exam: true });
assert.ok(exam[exam.length - 1].content.includes('exam mode'));

for (let i = 0; i < 6; i++) assert.equal(allow('test-ip'), null);
assert.equal(allow('test-ip'), 'rate_minute');

const r2 = await fetch(base + '/nope'); assert.equal(r2.status, 404);
await new Promise(r => server.close(r));
console.log('backend tests passed');
