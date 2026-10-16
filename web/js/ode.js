/* Numerical ODE tools used by labs. All methods are standard textbook schemes. */
(function () {
  const DT = window.DT;
  const ODE = {};
  /* one step of the classical methods for y' = f(x, y) (scalar or array y) */
  const add = (a, b, s) => Array.isArray(a) ? a.map((v, i) => v + s * b[i]) : a + s * b;
  ODE.eulerStep = (f, x, y, h) => add(y, f(x, y), h);
  ODE.heunStep = (f, x, y, h) => { const k1 = f(x, y), k2 = f(x + h, add(y, k1, h)); return Array.isArray(y) ? y.map((v, i) => v + h / 2 * (k1[i] + k2[i])) : y + h / 2 * (k1 + k2); };
  ODE.rk4Step = (f, x, y, h) => {
    const k1 = f(x, y), k2 = f(x + h / 2, add(y, k1, h / 2)), k3 = f(x + h / 2, add(y, k2, h / 2)), k4 = f(x + h, add(y, k3, h));
    return Array.isArray(y) ? y.map((v, i) => v + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])) : y + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
  };
  ODE.solve = function (method, f, x0, y0, x1, n) {
    const step = { euler: ODE.eulerStep, heun: ODE.heunStep, rk4: ODE.rk4Step }[method];
    const h = (x1 - x0) / n, xs = [x0], ys = [y0];
    let x = x0, y = y0;
    for (let i = 0; i < n; i++) { y = step(f, x, y, h); x = x0 + (i + 1) * h; xs.push(x); ys.push(y); }
    return { xs, ys, h };
  };
  /* integral curve through (x0,y0) traced forward and backward with RK4; stops outside the box or on blow-up */
  ODE.integralCurve = function (f, x0, y0, box, h) {
    h = h || (box.xmax - box.xmin) / 600;
    const trace = dir => {
      const pts = []; let x = x0, y = y0;
      for (let i = 0; i < 4000; i++) {
        const yn = ODE.rk4Step(f, x, y, dir * h);
        const xn = x + dir * h;
        if (!isFinite(yn) || xn < box.xmin - h || xn > box.xmax + h) break;
        const span = box.ymax - box.ymin;
        if (yn < box.ymin - span || yn > box.ymax + span) { pts.push([xn, yn]); break; }
        pts.push([xn, yn]); x = xn; y = yn;
      }
      return pts;
    };
    const back = trace(-1).reverse();
    return back.concat([[x0, y0]], trace(1));
  };
  /* trajectory of an autonomous planar system X' = F(X) */
  ODE.trajectory = function (F, p0, T, h, box) {
    const f = (t, u) => F(u[0], u[1]);
    const out = dir => { const pts = []; let u = p0.slice(); for (let i = 0; i < T / h; i++) { u = ODE.rk4Step(f, 0, u, dir * h); if (!isFinite(u[0]) || !isFinite(u[1])) break; pts.push(u.slice()); if (box && (Math.abs(u[0]) > 4 * box || Math.abs(u[1]) > 4 * box)) break; } return pts; };
    return { fwd: [p0.slice()].concat(out(1)), bwd: [p0.slice()].concat(out(-1)) };
  };
  /* 2x2 eigen-analysis */
  ODE.eig2 = function (a, b, c, d) {
    const tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det;
    if (disc >= 0) { const s = Math.sqrt(disc); return { tr, det, disc, real: true, l1: (tr + s) / 2, l2: (tr - s) / 2 }; }
    return { tr, det, disc, real: false, re: tr / 2, im: Math.sqrt(-disc) / 2 };
  };
  /* classification of the equilibrium of X' = AX (standard trace–determinant chart) */
  ODE.classify2 = function (a, b, c, d) {
    const e = ODE.eig2(a, b, c, d), eps = 1e-9;
    if (Math.abs(e.det) < eps) return 'degenerate';
    if (e.det < 0) return 'saddle';
    if (Math.abs(e.tr) < eps) return 'center';
    if (Math.abs(e.disc) < eps) return e.tr < 0 ? 'stable-degenerate-node' : 'unstable-degenerate-node';
    if (e.disc > 0) return e.tr < 0 ? 'stable-node' : 'unstable-node';
    return e.tr < 0 ? 'stable-focus' : 'unstable-focus';
  };
  /* quadratic roots (for characteristic equations), returns {type, r1, r2} or complex {alpha, beta} */
  ODE.quadRoots = function (a, b, c) {
    const D = b * b - 4 * a * c;
    if (Math.abs(D) < 1e-12) return { type: 'double', r: -b / (2 * a), D: 0 };
    if (D > 0) { const s = Math.sqrt(D); return { type: 'real', r1: (-b + s) / (2 * a), r2: (-b - s) / (2 * a), D }; }
    return { type: 'complex', alpha: -b / (2 * a), beta: Math.sqrt(-D) / (2 * a), D };
  };
  DT.ODE = ODE;
})();
