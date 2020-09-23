(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.accessabilityHighContrast = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  document.getElementById('js-high-contrast-toggler').addEventListener('click', function (ev) {
    isCookieSet('highContrast') ? deletCookie('highContrast') : setCookie('highContrast', true, 7);
    document.body.classList.toggle('high-contrast');
  });
  /**
   * Used to set accessibility values when page content is loaded.
   */

  window.addEventListener('DOMContentLoaded', function (ev) {
    if (isCookieSet('highContrast')) {
      document.body.classList.add('high-contrast');
    }
  });
});