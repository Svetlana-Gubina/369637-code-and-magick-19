'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var deb = function (func) {
    var lastTimeout = null;

    return function () {
      var params = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        func.apply(null, params);
      }, DEBOUNCE_INTERVAL);
    };
  };
  window.debounce = {
    deb: deb,
  };
})();
