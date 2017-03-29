/*
* https://github.com/carhartl/jquery-cookie
 */
(function (m) {
  'use strict';

  window.mx = window.mx || {};

  function encode(s) {
    return encodeURIComponent(s).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
  }

  function decode(s) {
    return decodeURIComponent(s).replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);;
  }

  function stringifyCookieValue(value) {
    return encode(JSON.stringify(value));
  }

  function parseCookieValue(s) {
    try {
      s = decode(s);
      return JSON.parse(s);
    } catch (e) { }
  }

  function read(s, converter) {
    var value = parseCookieValue(s);
    return value;
  }

  mx.cookie = function (key, value, options) {
    // Write
    options = options || {};

    if (arguments.length > 1) {

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {},
      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling $.cookie().
      cookies = document.cookie ? document.cookie.split('; ') : [],
      i = 0,
      l = cookies.length;

    for (; i < l; i++) {
      var parts = cookies[i].split('='),
        name = decode(parts.shift()),
        cookie = parts.join('=');

      if (key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  mx.removeCookie = function (key, options) {
    options = options || {};
    options.expires = -1;
    
    mx.cookie(key, '', options);
    return !mx.cookie(key);
  };
})(m);
