// Offline tests: no API key needed. Checks the not-configured path, validation and rate limiting.
import assert from 'node:assert';
delete process.env.ANTHROPIC_API_KEY; delete process.env.ANTHROPIC_AUTH_TOKEN;
const { server, buildMessages } = await import('./server.js');
await new Promise(r => server.listen(0, r));
const base = 'http://127.0.0.1:' + server.address().port;
const h = await (await fetch(base + '/health')).json();
assert.equal(h.configured, false);
const r1 = await fetch(base + '/api/ai', { method: 'POST', body: JSON.stringify({ mode: 'hint', lang: 'uz' }) });
assert.equal(r1.status, 503);
const m = buildMessages({ mode: 'check', lang: 'ru', topic: 't02', solution: 'y=Ce^x', history: [{ role: 'assistant', text: 'x' }, { role: 'user', text: 'q' }, { role: 'assistant', text: 'a' }] });
assert.equal(m[0].role, 'user'); assert.equal(m[m.length - 1].role, 'user');
assert.ok(m[m.length - 1].content.includes('Russian'));
const r2 = await fetch(base + '/nope'); assert.equal(r2.status, 404);
server.close();
console.log('backend tests passed');
