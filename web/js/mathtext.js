/* Light markdown + KaTeX rendering for course text.
   Supports: paragraphs, "- " lists, "1. " lists, **bold**, *italic*, `code`, $inline$, $$display$$, [text](#/route). */
(function () {
  const DT = window.DT;
  function katexStr(tex, display) {
    try {
      return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: 'ignore', trust: false, output: 'htmlAndMathml' });
    } catch (e) {
      return '<span class="math-err">' + DT.esc(tex) + '</span>';
    }
  }
  DT.katexStr = katexStr;
  function inline(s) {
    // protect math first
    const parts = [];
    let out = '';
    let i = 0;
    while (i < s.length) {
      if (s[i] === '\\' && s[i + 1] === '$') { out += '$'; i += 2; continue; }
      if (s[i] === '$') {
        const j = s.indexOf('$', i + 1);
        if (j > i) { parts.push(katexStr(s.slice(i + 1, j), false)); out += '\u0000' + (parts.length - 1) + '\u0000'; i = j + 1; continue; }
      }
      out += s[i]; i++;
    }
    out = DT.esc(out)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\((#[^)\s]+)\)/g, '<a href="$2">$1</a>');
    return out.replace(/\u0000(\d+)\u0000/g, (m, k) => parts[+k]);
  }
  DT.inline = inline;
  DT.md = function (src) {
    if (src == null) return '';
    src = DT.tx(src);
    // pull out display math blocks
    const disp = [];
    src = src.replace(/\$\$([\s\S]+?)\$\$/g, (m, tex) => { disp.push(tex.trim()); return '\n\n\u0001' + (disp.length - 1) + '\u0001\n\n'; });
    const blocks = src.split(/\n\s*\n/);
    let html = '';
    for (let b of blocks) {
      b = b.trim();
      if (!b) continue;
      const dm = b.match(/^\u0001(\d+)\u0001$/);
      if (dm) { html += '<div class="math-display">' + katexStr(disp[+dm[1]], true) + '</div>'; continue; }
      const lines = b.split('\n');
      if (lines.every(l => /^\s*[-•]\s+/.test(l))) {
        html += '<ul>' + lines.map(l => '<li>' + inline(l.replace(/^\s*[-•]\s+/, '')) + '</li>').join('') + '</ul>';
      } else if (lines.every(l => /^\s*\d+[.)]\s+/.test(l))) {
        html += '<ol>' + lines.map(l => '<li>' + inline(l.replace(/^\s*\d+[.)]\s+/, '')) + '</li>').join('') + '</ol>';
      } else {
        html += '<p>' + lines.map(inline).join('<br>') + '</p>';
      }
    }
    return html;
  };
  /* plain text (for search and AI context): strip markup but keep TeX source */
  DT.plain = function (src) { return DT.tx(src).replace(/\*\*|`/g, '').replace(/\$\$/g, ' ').replace(/\$/g, ''); };
})();
