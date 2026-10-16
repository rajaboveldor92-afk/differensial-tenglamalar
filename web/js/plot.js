/* Minimal canvas plotting: axes with labelled ticks, curves, direction fields, points. Colours come from CSS tokens. */
(function () {
  const DT = window.DT;
  function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#000'; }
  DT.css = css;
  function niceStep(span, target) {
    const raw = span / target, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
  }
  function fmt(v, step) { const d = Math.max(0, -Math.floor(Math.log10(step) + 1e-9)); return Math.abs(v) < step / 1e6 ? '0' : v.toFixed(Math.min(d, 4)).replace('-', '−'); }

  function Plot(host, opt) {
    this.opt = Object.assign({ xmin: -3, xmax: 3, ymin: -3, ymax: 3, aspect: 0.75, xlabel: 'x', ylabel: 'y', pad: [14, 14, 30, 40], maxH: 520 }, opt);
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('role', 'img');
    if (this.opt.label) this.canvas.setAttribute('aria-label', this.opt.label);
    host.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this._ro = new ResizeObserver(() => { const w = this.canvas.clientWidth; if (w && w !== this._w) { this.resize(); if (this.onResize) this.onResize(); } });
    this._ro.observe(this.canvas);
  }
  Plot.prototype.resize = function () {
    const w = this.canvas.clientWidth || this.canvas.parentNode.clientWidth || 320;
    const h = Math.min(this.opt.maxH, Math.round(w * this.opt.aspect));
    const dpr = window.devicePixelRatio || 1;
    this._w = w; this.W = w; this.H = h;
    this.canvas.style.height = h + 'px';
    this.canvas.width = Math.round(w * dpr); this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  Plot.prototype.setView = function (v) { Object.assign(this.opt, v); };
  Plot.prototype.box = function () { const [t, r, b, l] = this.opt.pad; return { x0: l, y0: t, x1: this.W - r, y1: this.H - b }; };
  Plot.prototype.X = function (x) { const b = this.box(), o = this.opt; return b.x0 + (x - o.xmin) / (o.xmax - o.xmin) * (b.x1 - b.x0); };
  Plot.prototype.Y = function (y) { const b = this.box(), o = this.opt; return b.y1 - (y - o.ymin) / (o.ymax - o.ymin) * (b.y1 - b.y0); };
  Plot.prototype.inv = function (px, py) { const b = this.box(), o = this.opt; return [o.xmin + (px - b.x0) / (b.x1 - b.x0) * (o.xmax - o.xmin), o.ymin + (b.y1 - py) / (b.y1 - b.y0) * (o.ymax - o.ymin)]; };
  Plot.prototype.clear = function () {
    const c = this.ctx; c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, this.canvas.width, this.canvas.height); c.restore();
    c.fillStyle = css('--sheet'); c.fillRect(0, 0, this.W, this.H);
  };
  Plot.prototype.axes = function () {
    const c = this.ctx, o = this.opt, b = this.box();
    const sx = niceStep(o.xmax - o.xmin, Math.max(3, this.W / 80)), sy = niceStep(o.ymax - o.ymin, Math.max(3, this.H / 60));
    c.lineWidth = 1; c.strokeStyle = css('--grid'); c.fillStyle = css('--ink-3'); c.font = '11px ' + css('--sans');
    c.beginPath();
    for (let x = Math.ceil(o.xmin / sx) * sx; x <= o.xmax + 1e-9; x += sx) { const X = Math.round(this.X(x)) + .5; c.moveTo(X, b.y0); c.lineTo(X, b.y1); }
    for (let y = Math.ceil(o.ymin / sy) * sy; y <= o.ymax + 1e-9; y += sy) { const Y = Math.round(this.Y(y)) + .5; c.moveTo(b.x0, Y); c.lineTo(b.x1, Y); }
    c.stroke();
    // axes lines
    c.strokeStyle = css('--ink-3'); c.lineWidth = 1.2; c.beginPath();
    const ax = Math.min(Math.max(0, o.xmin), o.xmax), ay = Math.min(Math.max(0, o.ymin), o.ymax);
    c.moveTo(b.x0, this.Y(ay)); c.lineTo(b.x1, this.Y(ay)); c.moveTo(this.X(ax), b.y0); c.lineTo(this.X(ax), b.y1); c.stroke();
    // tick labels on frame
    c.textAlign = 'center'; c.textBaseline = 'top';
    for (let x = Math.ceil(o.xmin / sx) * sx; x <= o.xmax + 1e-9; x += sx) c.fillText(fmt(x, sx), this.X(x), b.y1 + 4);
    c.textAlign = 'right'; c.textBaseline = 'middle';
    for (let y = Math.ceil(o.ymin / sy) * sy; y <= o.ymax + 1e-9; y += sy) c.fillText(fmt(y, sy), b.x0 - 5, this.Y(y));
    c.strokeStyle = css('--rule'); c.strokeRect(b.x0 + .5, b.y0 + .5, b.x1 - b.x0, b.y1 - b.y0);
    // axis names
    c.fillStyle = css('--ink-2'); c.font = 'italic 13px ' + css('--serif');
    c.textAlign = 'right'; c.textBaseline = 'bottom'; c.fillText(o.xlabel, b.x1 - 2, b.y1 - 3);
    c.textAlign = 'left'; c.textBaseline = 'top'; c.fillText(o.ylabel, b.x0 + 4, b.y0 + 2);
  };
  Plot.prototype.clip = function (fn) { const c = this.ctx, b = this.box(); c.save(); c.beginPath(); c.rect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0); c.clip(); fn(); c.restore(); };
  Plot.prototype.line = function (pts, st) {
    st = st || {}; const c = this.ctx;
    this.clip(() => {
      c.strokeStyle = st.color || css('--curve-1'); c.lineWidth = st.width || 2; c.setLineDash(st.dash || []);
      c.beginPath(); let pen = false;
      const span = this.opt.ymax - this.opt.ymin;
      for (const p of pts) {
        if (!isFinite(p[1]) || Math.abs(p[1] - this.opt.ymin) > 50 * span + Math.abs(this.opt.ymin)) { pen = false; continue; }
        const X = this.X(p[0]), Y = this.Y(p[1]);
        if (!pen) { c.moveTo(X, Y); pen = true; } else c.lineTo(X, Y);
      }
      c.stroke(); c.setLineDash([]);
    });
  };
  Plot.prototype.fn = function (f, st, n) {
    n = n || Math.max(200, this.W); const o = this.opt, pts = [];
    let prev = null;
    for (let i = 0; i <= n; i++) {
      const x = o.xmin + (o.xmax - o.xmin) * i / n, y = f(x);
      if (prev != null && isFinite(y) && isFinite(prev) && Math.abs(y - prev) > 3 * (o.ymax - o.ymin)) pts.push([x, NaN]); // asymptote break
      pts.push([x, y]); prev = y;
    }
    this.line(pts, st);
  };
  Plot.prototype.field = function (f, opts) {
    opts = opts || {}; const c = this.ctx, o = this.opt, b = this.box();
    const nx = opts.nx || Math.max(10, Math.round((b.x1 - b.x0) / 26)), ny = opts.ny || Math.max(8, Math.round((b.y1 - b.y0) / 26));
    const len = Math.min((b.x1 - b.x0) / nx, (b.y1 - b.y0) / ny) * 0.38;
    c.strokeStyle = opts.color || css('--ink-3'); c.lineWidth = 1.1; c.beginPath();
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
      const x = o.xmin + (i + .5) * (o.xmax - o.xmin) / nx, y = o.ymin + (j + .5) * (o.ymax - o.ymin) / ny;
      let dx, dy;
      if (opts.vector) { const v = f(x, y); dx = v[0]; dy = v[1]; }
      else { const s = f(x, y); if (!isFinite(s)) continue; dx = 1; dy = s; }
      if (!isFinite(dx) || !isFinite(dy)) continue;
      // direction in pixel space
      let px = dx * (b.x1 - b.x0) / (o.xmax - o.xmin), py = -dy * (b.y1 - b.y0) / (o.ymax - o.ymin);
      const m = Math.hypot(px, py); if (m < 1e-12) { const X = this.X(x), Y = this.Y(y); c.moveTo(X - 1, Y); c.lineTo(X + 1, Y); continue; }
      px /= m; py /= m;
      const X = this.X(x), Y = this.Y(y);
      c.moveTo(X - px * len, Y - py * len); c.lineTo(X + px * len, Y + py * len);
      if (opts.vector) { // arrow head
        const hx = X + px * len, hy = Y + py * len;
        c.moveTo(hx, hy); c.lineTo(hx - px * 4 - py * 3, hy - py * 4 + px * 3);
        c.moveTo(hx, hy); c.lineTo(hx - px * 4 + py * 3, hy - py * 4 - px * 3);
      }
    }
    c.stroke();
  };
  Plot.prototype.dot = function (x, y, st) {
    st = st || {}; const c = this.ctx;
    c.fillStyle = st.color || css('--rust'); c.beginPath(); c.arc(this.X(x), this.Y(y), st.r || 4.5, 0, 2 * Math.PI); c.fill();
    if (st.ring) { c.strokeStyle = css('--sheet'); c.lineWidth = 1.5; c.stroke(); }
  };
  Plot.prototype.text = function (x, y, s, st) {
    st = st || {}; const c = this.ctx; c.fillStyle = st.color || css('--ink'); c.font = (st.font || '12px') + ' ' + css('--sans');
    c.textAlign = st.align || 'left'; c.textBaseline = st.base || 'bottom'; c.fillText(s, this.X(x) + (st.dx || 0), this.Y(y) + (st.dy || 0));
  };
  Plot.prototype.onTap = function (cb) {
    this.canvas.addEventListener('pointerup', e => {
      const r = this.canvas.getBoundingClientRect();
      const p = this.inv(e.clientX - r.left, e.clientY - r.top);
      const b = this.box(), px = e.clientX - r.left, py = e.clientY - r.top;
      if (px < b.x0 || px > b.x1 || py < b.y0 || py > b.y1) return;
      cb(p[0], p[1]);
    });
  };
  Plot.prototype.destroy = function () { this._ro.disconnect(); };
  DT.Plot = Plot;
  DT.niceStep = niceStep;
  /* wrap a plot with caption + legend + text description */
  DT.plotBox = function (opt) {
    const wrap = DT.h('figure', { class: 'plot-wrap', style: { margin: '10px 0' } });
    const p = new Plot(wrap, opt);
    const legend = DT.h('div', { class: 'legend' });
    const cap = DT.h('figcaption', { class: 'plot-caption' });
    wrap.appendChild(legend); wrap.appendChild(cap);
    p.legend = items => { legend.innerHTML = items.map(it => '<span><i class="' + (it.dash || '') + '" style="border-color:' + it.color + '"></i>' + DT.esc(it.label) + '</span>').join(''); };
    p.caption = s => { cap.textContent = s; };
    p.el = wrap;
    return p;
  };
})();
