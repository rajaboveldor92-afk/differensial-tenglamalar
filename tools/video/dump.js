// Prints all video scripts as JSON: node tools/video/dump.js > scripts.json
const fs = require('fs'), path = require('path');
global.DT = { L: (uz, ru, en) => ({ uz, ru, en }), R: String.raw, V: {} };
function cleanVideo(v) {
  (v.parts || []).forEach(part => {
    if (Array.isArray(part.segments)) {
      part.segments = part.segments.filter(seg => !(seg && seg.show && seg.show.kind === 'sources'));
    }
    if (Object.prototype.hasOwnProperty.call(part, 'sources')) delete part.sources;
  });
  return v;
}
DT.addVideo = v => { DT.V[v.topic] = cleanVideo(v); };
const dir = path.join(__dirname, '../../web/content/video');
for (const f of fs.readdirSync(dir).filter(f => /^t\w+\.js$/.test(f)).sort()) require(path.join(dir, f));
process.stdout.write(JSON.stringify(DT.V));
