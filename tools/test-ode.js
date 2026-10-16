// Numerical checks of web/js/ode.js used by the labs: convergence order of Euler/Heun/RK4, equilibrium classification, quadratic roots.
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = { window: {}, Math }; ctx.window.DT = {}; ctx.DT = ctx.window.DT; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '../web/js/ode.js'), 'utf8'), ctx);
const O = ctx.DT.ODE; let fail = 0;
const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m); } else console.log('ok  ', m); };
const f = (x, y) => y;                     // y' = y, y(0)=1 -> e at x=1
for (const [m, p] of [['euler', 1], ['heun', 2], ['rk4', 4]]) {
  const e1 = Math.abs(O.solve(m, f, 0, 1, 1, 20).ys[20] - Math.E), e2 = Math.abs(O.solve(m, f, 0, 1, 1, 40).ys[40] - Math.E);
  const order = Math.log2(e1 / e2); ok(Math.abs(order - p) < 0.15, `${m}: observed order ${order.toFixed(3)} (expected ${p})`);
}
const g = (x, y) => -2 * x * y;            // y = exp(-x^2)
ok(Math.abs(O.solve('rk4', g, 0, 1, 2, 200).ys[200] - Math.exp(-4)) < 1e-8, 'rk4 on y\'=-2xy matches exp(-x^2) to 1e-8');
const sys = (t, u) => [u[1], -u[0]];       // harmonic oscillator, one period
const r = O.solve('rk4', sys, 0, [1, 0], 2 * Math.PI, 400).ys[400];
ok(Math.hypot(r[0] - 1, r[1]) < 1e-7, 'rk4 system: oscillator returns after 2π');
const C = [[[0, 1, -1, 0], 'center'], [[1, 0, 0, -1], 'saddle'], [[-1, 0, 0, -2], 'stable-node'], [[1, 2, -2, 1], 'unstable-focus'], [[-1, 1, 0, -1], 'stable-degenerate-node'], [[1, 1, 1, 1], 'degenerate']];
for (const [m, want] of C) ok(O.classify2(...m) === want, `classify ${JSON.stringify(m)} = ${want}`);
const q1 = O.quadRoots(1, -3, 2); ok(q1.type === 'real' && q1.r1 === 2 && q1.r2 === 1, 'r^2-3r+2: roots 2, 1');
const q2 = O.quadRoots(1, 2, 5); ok(q2.type === 'complex' && q2.alpha === -1 && q2.beta === 2, 'r^2+2r+5: -1 ± 2i');
const q3 = O.quadRoots(1, -4, 4); ok(q3.type === 'double' && q3.r === 2, 'r^2-4r+4: double root 2');
console.log(fail ? fail + ' failed' : 'all ode checks passed'); process.exit(fail ? 1 : 0);
