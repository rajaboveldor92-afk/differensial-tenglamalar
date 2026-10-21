// Prints full video scripts derived from the app's lesson blocks as JSON.
// Usage: node tools/video/dump.js > scripts.json
const fs = require('fs'), path = require('path');

global.DT = {
  L: (uz, ru, en) => ({ uz, ru, en }),
  R: String.raw,
  TOPICS: {},
  addTopic: t => { DT.TOPICS[t.id] = t; }
};

const contentDir = path.join(__dirname, '../../web/content');
for (const f of fs.readdirSync(contentDir).filter(f => /^t(?:\d\d|L)\.js$/.test(f)).sort()) {
  require(path.join(contentDir, f));
}

require(path.join(__dirname, '../../web/js/video-full.js'));

const videos = {};
for (const id of Object.keys(DT.TOPICS).sort()) videos[id] = DT.makeFullVideo(DT.TOPICS[id]);
process.stdout.write(JSON.stringify(videos));
