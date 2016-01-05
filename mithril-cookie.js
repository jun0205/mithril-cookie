/*
* https://github.com/carhartl/jquery-cookie
 */
(function (m) {
  'use strict';

  window.mx = window.mx || {};

  var pluses = /\+/g;

  function encode(s) {
    return encodeURIComponent(s);
  }

  function decode(s) {
    return decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(JSON.stringify(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return JSON.parse(s);
    } catch (e) { }
  }

  function read(s, converter) {
    var value = parseCookieValue(s);
    return value;
  }

  mx.cookie = function (key, value, options) {
    // Write
    options = Object.assign({}, options);

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
    mx.cookie(key, '', Object.assign({}, options, { expires: -1 }));
    return !mx.cookie(key);
  };
})(m);
