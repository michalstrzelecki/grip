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
    global.cookies = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  window.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  };

  window.getCookie = function (cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  };

  window.isCookieSet = function (cname) {
    return getCookie(cname).length > 0;
  };

  window.deletCookie = function (cname) {
    if (!isCookieSet(cname)) {
      return true;
    }

    setCookie(cname, null, -256);
    return true;
  };
});