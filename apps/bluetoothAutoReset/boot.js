(function() {
  function performReset ()
  {
      var storage = require('Storage');
      var state = storage.readJSON('bluetoothautoreset.json',1);
      var t = new Date();
      var now = t.getTime();
      const SIX_HOURS_IN_MS = 21600000;
      NRF.disconnect();
      NRF.restart();
      state.next = now+SIX_HOURS_IN_MS;
      storage.writeJSON("bluetoothautoreset.json",state);
      queueReset();
  }
  function queueReset() {
    var state = require('Storage').readJSON('bluetoothautoreset.json',1);
    var next = state.previous;
    var t = new Date();
    var now = t.getTime();
    if(next === undefined || next === null || next < now)
    {
        performReset();
    }
    else
    {
        setTimeout(performReset, next-now);
    }
  }
  queueReset();
})();
