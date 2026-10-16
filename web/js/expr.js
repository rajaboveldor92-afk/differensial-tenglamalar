/* Small math expression parser, evaluator, LaTeX printer and answer checkers.
   Checkers return 'ok' | 'bad' | 'unk' ('unk' = could not verify; never shown as wrong). */
(function () {
  const DT = window.DT;
  const FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: x => 1 / Math.tan(x),
    arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan, arcctg: x => Math.PI / 2 - Math.atan(x),
    sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh, sh: Math.sinh, ch: Math.cosh, th: Math.tanh,
    exp: Math.exp, ln: x => (x > 0 ? Math.log(x) : NaN), log: x => (x > 0 ? Math.log(x) : NaN),
    sqrt: x => (x >= 0 ? Math.sqrt(x) : NaN), abs: Math.abs, sgn: Math.sign, sign: Math.sign,
    tg: Math.tan, ctg: x => 1 / Math.tan(x), arctg: Math.atan, asin: Math.asin, acos: Math.acos, atan: Math.atan
  };
  const CONSTS = { pi: Math.PI, e: Math.E };

  function tokenize(s) {
    s = s.replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/\*\*/g, '^').replace(/π/g, 'pi').replace(/,/g, '.');
    const toks = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (/[0-9.]/.test(c)) {
        let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
        if (s[j] === 'e' && /[0-9+-]/.test(s[j + 1] || '') && !/[a-z]/i.test(s[j + 1] || '')) { // 1e-3
          let k = j + 1; if (s[k] === '+' || s[k] === '-') k++; while (k < s.length && /[0-9]/.test(s[k])) k++; j = k;
        }
        const v = parseFloat(s.slice(i, j)); if (isNaN(v)) throw new Error('num');
        toks.push({ t: 'num', v }); i = j; continue;
      }
      if (/[a-zA-Z_]/.test(c)) {
        let j = i; while (j < s.length && /[a-zA-Z_0-9]/.test(s[j])) j++;
        toks.push({ t: 'id', v: s.slice(i, j) }); i = j; continue;
      }
      if ('+-*/^()|'.includes(c)) { toks.push({ t: c }); i++; continue; }
      throw new Error('char ' + c);
    }
    return toks;
  }
  /* split identifiers like "xy" or "Cx" into known pieces when they are not a known name */
  function splitIds(toks, vars) {
    const known = new Set([...Object.keys(FUNCS), ...Object.keys(CONSTS), ...vars]);
    const out = [];
    for (const tk of toks) {
      if (tk.t !== 'id' || known.has(tk.v) || /^C\d*$/.test(tk.v)) { out.push(tk); continue; }
      // greedy split into known names
      let s = tk.v, parts = [], ok = true;
      while (s.length) {
        let m = null;
        for (let L = s.length; L > 0; L--) { const p = s.slice(0, L); if (known.has(p) || /^C\d*$/.test(p)) { m = p; break; } }
        if (!m) { ok = false; break; }
        parts.push(m); s = s.slice(m.length);
      }
      if (!ok) out.push(tk); else parts.forEach((p, k) => { if (k) out.push({ t: '*' }); out.push({ t: 'id', v: p }); });
    }
    return out;
  }
  function parse(str, vars) {
    vars = vars || ['x', 'y', 't'];
    let toks = splitIds(tokenize(str), vars);
    let p = 0;
    const peek = () => toks[p], next = () => toks[p++];
    const startsFactor = tk => tk && (tk.t === 'num' || tk.t === 'id' || tk.t === '(');
    function expr() {
      let a = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) { const o = next().t; a = { t: 'op', o, a, b: term() }; }
      return a;
    }
    function term() {
      let a = unary();
      for (;;) {
        const tk = peek();
        if (tk && (tk.t === '*' || tk.t === '/')) { next(); a = { t: 'op', o: tk.t, a, b: unary() }; }
        else if (startsFactor(tk)) { a = { t: 'op', o: '*', a, b: power() }; } // implicit multiplication
        else break;
      }
      return a;
    }
    function unary() {
      if (peek() && peek().t === '-') { next(); return { t: 'neg', a: unary() }; }
      if (peek() && peek().t === '+') { next(); return unary(); }
      return power();
    }
    function power() {
      const base = primary();
      if (peek() && peek().t === '^') { next(); return { t: 'op', o: '^', a: base, b: unary() }; }
      return base;
    }
    function primary() {
      const tk = next();
      if (!tk) throw new Error('end');
      if (tk.t === 'num') return { t: 'num', v: tk.v };
      if (tk.t === '(') { const e = expr(); if (!next() || toks[p - 1].t !== ')') throw new Error(')'); return e; }
      if (tk.t === '|') { const e = expr(); if (!next() || toks[p - 1].t !== '|') throw new Error('|'); return { t: 'fn', f: 'abs', a: e }; }
      if (tk.t === 'id') {
        if (FUNCS[tk.v]) {
          // allow sin^2(x)
          let powExp = null;
          if (peek() && peek().t === '^') { next(); powExp = primary(); }
          let arg;
          if (peek() && peek().t === '(') { next(); arg = expr(); if (!next() || toks[p - 1].t !== ')') throw new Error(')'); }
          else arg = power();
          const node = { t: 'fn', f: tk.v, a: arg };
          return powExp ? { t: 'op', o: '^', a: node, b: powExp } : node;
        }
        if (CONSTS[tk.v] !== undefined && !vars.includes(tk.v)) return { t: 'const', n: tk.v };
        if (vars.includes(tk.v) || /^C\d*$/.test(tk.v)) return { t: 'var', n: tk.v };
        throw new Error('unknown ' + tk.v);
      }
      throw new Error('unexpected ' + tk.t);
    }
    const ast = expr();
    if (p !== toks.length) throw new Error('trailing');
    return ast;
  }
  function ev(n, env) {
    switch (n.t) {
      case 'num': return n.v;
      case 'const': return CONSTS[n.n];
      case 'var': return env[n.n] !== undefined ? env[n.n] : NaN;
      case 'neg': return -ev(n.a, env);
      case 'fn': return FUNCS[n.f](ev(n.a, env));
      case 'op': {
        const a = ev(n.a, env), b = ev(n.b, env);
        switch (n.o) {
          case '+': return a + b; case '-': return a - b; case '*': return a * b;
          case '/': return Math.abs(b) < 1e-300 ? NaN : a / b;
          case '^': { if (a < 0 && Math.abs(b - Math.round(b)) > 1e-12) { // odd roots like (-8)^(1/3)
              const q = 1 / b; if (Math.abs(q - Math.round(q)) < 1e-9 && Math.round(q) % 2) return -Math.pow(-a, b); return NaN; }
            return Math.pow(a, b); }
        }
      }
    }
    return NaN;
  }
  function usedVars(n, set) {
    set = set || new Set();
    if (n.t === 'var') set.add(n.n);
    if (n.a) usedVars(n.a, set); if (n.b) usedVars(n.b, set);
    return set;
  }
  /* LaTeX printer for previews */
  const PREC = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  function tex(n, parentPrec) {
    parentPrec = parentPrec || 0;
    let s, prec = 9;
    switch (n.t) {
      case 'num': s = String(+n.v.toPrecision(12)); break;
      case 'const': s = n.n === 'pi' ? '\\pi' : 'e'; break;
      case 'var': s = n.n.replace(/^C(\d+)$/, 'C_{$1}'); break;
      case 'neg': prec = 2; s = '-' + tex(n.a, 2); break;
      case 'fn': {
        const nm = { ln: '\\ln', log: '\\ln', sin: '\\sin', cos: '\\cos', tan: '\\tan', tg: '\\operatorname{tg}', cot: '\\cot', ctg: '\\operatorname{ctg}', exp: 'e^', arctan: '\\arctan', arctg: '\\operatorname{arctg}', arcsin: '\\arcsin', arccos: '\\arccos', sinh: '\\sinh', cosh: '\\cosh', tanh: '\\tanh', sqrt: '\\sqrt', abs: '|' }[n.f] || '\\operatorname{' + n.f + '}';
        if (n.f === 'exp') s = 'e^{' + tex(n.a) + '}';
        else if (n.f === 'sqrt') s = '\\sqrt{' + tex(n.a) + '}';
        else if (n.f === 'abs') s = '\\left|' + tex(n.a) + '\\right|';
        else s = nm + '\\left(' + tex(n.a) + '\\right)';
        break;
      }
      case 'op':
        prec = PREC[n.o];
        if (n.o === '/') { s = '\\frac{' + tex(n.a) + '}{' + tex(n.b) + '}'; prec = 9; }
        else if (n.o === '^') s = tex(n.a, 4) + '^{' + tex(n.b) + '}';
        else if (n.o === '*') {
          const l = tex(n.a, 2), r = tex(n.b, 2);
          const needDot = /^[0-9]/.test(r) || (n.b.t === 'neg');
          s = l + (needDot ? ' \\cdot ' : ' ') + r;
        } else s = tex(n.a, 1) + ' ' + n.o + ' ' + tex(n.b, n.o === '-' ? 2 : 1);
        break;
    }
    return prec < parentPrec ? '\\left(' + s + '\\right)' : s;
  }
  function normalizeAnswer(str, lhsName) {
    let s = String(str).trim();
    if (!s) return null;
    // "y = f(x)" -> f(x);  "F(x,y) = G" -> F - (G)
    const eq = s.split('=');
    if (eq.length === 2) {
      const l = eq[0].trim();
      if (lhsName && l === lhsName) s = eq[1];
      else s = '(' + eq[0] + ')-(' + eq[1] + ')';
    } else if (eq.length > 2) return null;
    return s;
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function sampleEnv(ranges) { const env = {}; for (const k in ranges) env[k] = rnd(ranges[k][0], ranges[k][1]); return env; }
  const close = (a, b, tol) => Math.abs(a - b) <= tol * (1 + Math.max(Math.abs(a), Math.abs(b)));

  /* --- checkers --- */
  function checkEquiv(ans, spec) {
    // spec: { ref: 'expr', vars: {x:[a,b], ...}, lhs: 'y', tol }
    const varNames = Object.keys(spec.vars);
    let A, R;
    try { const s = normalizeAnswer(ans, spec.lhs || 'y'); if (s == null) return { res: 'unk', why: 'parse' }; A = parse(s, varNames); }
    catch (e) { return { res: 'unk', why: 'parse' }; }
    R = parse(spec.ref, varNames);
    const extra = [...usedVars(A)].filter(v => !varNames.includes(v));
    if (extra.length) return { res: 'bad', why: 'vars', extra };
    let valid = 0, bad = 0;
    for (let i = 0; i < 40 && valid < 12; i++) {
      const env = sampleEnv(spec.vars);
      const a = ev(A, env), r = ev(R, env);
      if (!isFinite(r)) continue;
      if (!isFinite(a)) { bad++; continue; }
      valid++;
      if (!close(a, r, spec.tol || 1e-6)) return { res: 'bad' };
    }
    if (valid < 5) return { res: bad > 5 ? 'bad' : 'unk' };
    return { res: 'ok' };
  }
  /* explicit solution family y(x; C...) of an ODE given as residual in x, y, yp, ypp, yppp */
  function checkOdeSolution(ans, spec) {
    // spec: { residual:'yp - 2*y', order:1, consts:['C'], x:[a,b], c:[a,b], ivp:{x0, y0, yp0?} }
    const consts = spec.consts || ['C'];
    let Y;
    try { const s = normalizeAnswer(ans, 'y'); if (s == null) return { res: 'unk' }; Y = parse(s, ['x', ...consts]); }
    catch (e) { return { res: 'unk', why: 'parse' }; }
    const used = [...usedVars(Y)];
    const extra = used.filter(v => v !== 'x' && !consts.includes(v));
    if (extra.length) return { res: 'bad', why: 'vars', extra };
    const Rz = parse(spec.residual, ['x', 'y', 'yp', 'ypp', 'yppp']);
    const order = spec.order || 1;
    if (!spec.ivp) {
      const missing = consts.filter(c => !used.includes(c));
      if (missing.length) return { res: 'bad', why: 'consts' };
    }
    const xr = spec.x || [0.3, 2], cr = spec.c || [-2, 2];
    let valid = 0;
    for (let i = 0; i < 60 && valid < 10; i++) {
      const env = { x: rnd(xr[0], xr[1]) };
      consts.forEach(c => env[c] = rnd(cr[0], cr[1]));
      if (spec.ivp) Object.assign(env, spec.ivpConsts || {});
      const h = 1e-3 * (1 + Math.abs(env.x));
      const f = dx => ev(Y, Object.assign({}, env, { x: env.x + dx }));
      const y0 = f(0), yP = f(h), yM = f(-h), yP2 = f(2 * h), yM2 = f(-2 * h);
      if (![y0, yP, yM, yP2, yM2].every(isFinite)) continue;
      const yp = (yM2 - 8 * yM + 8 * yP - yP2) / (12 * h);
      const ypp = (-yP2 + 16 * yP - 30 * y0 + 16 * yM - yM2) / (12 * h * h);
      const yppp = (yP2 - 2 * yP + 2 * yM - yM2) / (2 * h * h * h);
      const r = ev(Rz, { x: env.x, y: y0, yp, ypp, yppp });
      if (!isFinite(r)) continue;
      valid++;
      const scale = 1 + Math.abs(y0) + Math.abs(yp) + (order > 1 ? Math.abs(ypp) : 0);
      const tol = order === 1 ? 1e-6 : order === 2 ? 1e-4 : 1e-2;
      if (Math.abs(r) / scale > tol) return { res: 'bad' };
    }
    if (valid < 5) return { res: 'unk' };
    // independent constants: derivative w.r.t. each constant must be non-zero and (for 2) not proportional
    if (!spec.ivp && consts.length >= 1) {
      const rows = [];
      for (let i = 0; i < 6; i++) {
        const env = { x: rnd(xr[0], xr[1]) }; consts.forEach(c => env[c] = rnd(cr[0], cr[1]));
        const row = consts.map(c => { const d = 1e-4; const e1 = Object.assign({}, env), e2 = Object.assign({}, env); e1[c] += d; e2[c] -= d; return (ev(Y, e1) - ev(Y, e2)) / (2 * d); });
        if (row.every(isFinite)) rows.push(row);
      }
      if (rows.length < 3) return { res: 'unk' };
      if (consts.length === 1 && rows.every(r => Math.abs(r[0]) < 1e-9)) return { res: 'bad', why: 'consts' };
      if (consts.length === 2) {
        let maxDet = 0, scale = 0;
        for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) {
          maxDet = Math.max(maxDet, Math.abs(rows[i][0] * rows[j][1] - rows[i][1] * rows[j][0]));
          scale = Math.max(scale, Math.abs(rows[i][0] * rows[j][1]) + Math.abs(rows[i][1] * rows[j][0]));
        }
        if (maxDet < 1e-7 * (1 + scale)) return { res: 'bad', why: 'consts' };
      }
    }
    if (spec.ivp) {
      const e = { x: spec.ivp.x0 };
      const y0 = ev(Y, e);
      if (!close(y0, spec.ivp.y0, 1e-6)) return { res: 'bad', why: 'ivp' };
      if (spec.ivp.yp0 !== undefined) {
        const h = 1e-4; const d = (ev(Y, { x: spec.ivp.x0 + h }) - ev(Y, { x: spec.ivp.x0 - h })) / (2 * h);
        if (!close(d, spec.ivp.yp0, 1e-4)) return { res: 'bad', why: 'ivp' };
      }
    }
    return { res: 'ok' };
  }
  /* implicit general integral G(x,y)=C : compare with reference H via Jacobian G_x H_y - G_y H_x = 0 */
  function checkFirstIntegral(ans, spec) {
    let G, H;
    try { const s = normalizeAnswer(ans, null); if (s == null) return { res: 'unk' }; G = parse(s, ['x', 'y']); }
    catch (e) { return { res: 'unk', why: 'parse' }; }
    H = parse(spec.ref, ['x', 'y']);
    const extra = [...usedVars(G)].filter(v => v !== 'x' && v !== 'y' && !/^C\d*$/.test(v));
    if (extra.length) return { res: 'bad', why: 'vars', extra };
    const xr = spec.x || [0.3, 2], yr = spec.y || [0.3, 2];
    let valid = 0, nonconst = false;
    for (let i = 0; i < 60 && valid < 10; i++) {
      const env = { x: rnd(xr[0], xr[1]), y: rnd(yr[0], yr[1]), C: 1.37, C1: 0.71 };
      const d = 1e-5;
      const gx = (ev(G, Object.assign({}, env, { x: env.x + d })) - ev(G, Object.assign({}, env, { x: env.x - d }))) / (2 * d);
      const gy = (ev(G, Object.assign({}, env, { y: env.y + d })) - ev(G, Object.assign({}, env, { y: env.y - d }))) / (2 * d);
      const hx = (ev(H, Object.assign({}, env, { x: env.x + d })) - ev(H, Object.assign({}, env, { x: env.x - d }))) / (2 * d);
      const hy = (ev(H, Object.assign({}, env, { y: env.y + d })) - ev(H, Object.assign({}, env, { y: env.y - d }))) / (2 * d);
      if (![gx, gy, hx, hy].every(isFinite)) continue;
      valid++;
      if (Math.abs(gx) + Math.abs(gy) > 1e-7) nonconst = true;
      const J = gx * hy - gy * hx;
      const sc = (Math.abs(gx) + Math.abs(gy)) * (Math.abs(hx) + Math.abs(hy));
      if (Math.abs(J) > 1e-5 * (sc + 1e-12)) return { res: 'bad' };
    }
    if (valid < 5) return { res: 'unk' };
    if (!nonconst) return { res: 'bad' };
    return { res: 'ok' };
  }
  function checkNumeric(ans, spec) {
    // spec: { value, tol (absolute), rel }
    let s = String(ans).trim().replace(',', '.');
    if (!s) return { res: 'unk' };
    let v;
    try { v = ev(parse(s, []), {}); } catch (e) { return { res: 'unk', why: 'parse' }; }
    if (!isFinite(v)) return { res: 'unk', why: 'parse' };
    const tol = spec.tol != null ? spec.tol : 1e-6 * (1 + Math.abs(spec.value));
    return { res: Math.abs(v - spec.value) <= tol ? 'ok' : 'bad', value: v };
  }
  DT.Expr = { parse, ev, tex, usedVars, normalizeAnswer, checkEquiv, checkOdeSolution, checkFirstIntegral, checkNumeric, FUNCS };
  DT.previewTex = function (str, vars) {
    try { const s = normalizeAnswer(str, 'y'); const lhs = String(str).split('=').length === 2 ? String(str).split('=')[0].trim() : null; const t = tex(parse(s, vars || ['x', 'y', 't'])); return lhs === 'y' ? 'y = ' + t : t; } catch (e) { return null; }
  };
})();
