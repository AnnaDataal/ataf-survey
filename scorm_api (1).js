// SCORM 1.2 API Wrapper — lightweight, Moodle-compatible
var SCORM = (function() {
  var API = null;

  function findAPI(win) {
    var attempts = 0;
    while (win.API == null && win.parent != null && win.parent != win) {
      attempts++;
      if (attempts > 7) return null;
      win = win.parent;
    }
    return win.API;
  }

  function getAPI() {
    if (API) return API;
    API = findAPI(window);
    if (!API && window.opener) API = findAPI(window.opener);
    return API;
  }

  function init() {
    var api = getAPI();
    if (!api) return false;
    try {
      var result = api.LMSInitialize('');
      return result === 'true' || result === true;
    } catch(e) { return false; }
  }

  function set(key, val) {
    var api = getAPI();
    if (!api) return false;
    try {
      api.LMSSetValue(key, val);
      return true;
    } catch(e) { return false; }
  }

  function commit() {
    var api = getAPI();
    if (!api) return false;
    try {
      api.LMSCommit('');
      return true;
    } catch(e) { return false; }
  }

  function finish() {
    var api = getAPI();
    if (!api) return false;
    try {
      api.LMSFinish('');
      return true;
    } catch(e) { return false; }
  }

  // Auto-init on load
  window.addEventListener('load', function() { init(); });
  window.addEventListener('beforeunload', function() { commit(); finish(); });

  return { init: init, set: set, commit: commit, finish: finish };
})();

window.SCORM = SCORM;
