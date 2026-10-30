/* Removes source-only video segments and synthetic-voice notices from the learner-facing video flow. */
(function () {
  const DT = window.DT;
  if (!DT || !DT.addVideo) return;

  function cleanVideo(v) {
    (v.parts || []).forEach(part => {
      if (Array.isArray(part.segments)) {
        part.segments = part.segments.filter(seg => !(seg && seg.show && seg.show.kind === 'sources'));
      }
      if (Object.prototype.hasOwnProperty.call(part, 'sources')) delete part.sources;
    });
    return v;
  }

  const addVideo = DT.addVideo;
  DT.addVideo = v => addVideo(cleanVideo(v));
  Object.keys(DT.VIDEO || {}).forEach(k => cleanVideo(DT.VIDEO[k]));

  const videosView = DT.views && DT.views.videos;
  if (videosView) {
    DT.views.videos = function (root) {
      const removeSyntheticNotice = () => {
        const needle = DT.t ? DT.t('syntheticVoice') : '';
        if (!needle) return;
        root.querySelectorAll('.blk.note').forEach(el => {
          if ((el.textContent || '').includes(needle)) el.remove();
        });
      };
      const result = videosView(root);
      removeSyntheticNotice();
      setTimeout(removeSyntheticNotice, 0);
      if (result && typeof result.then === 'function') {
        return result.then(value => { removeSyntheticNotice(); return value; });
      }
      return result;
    };
  }
})();
