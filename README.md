# mithril-cookie
mithriljs cookie

Usage

Create session cookie:

mx.cookie('name', 'value');
Create expiring cookie, 7 days from then:

mx.cookie('name', 'value', { expires: 7 });
Create expiring cookie, valid across entire site:

mx.cookie('name', 'value', { expires: 7, path: '/' });
Read cookie:

mx.cookie('name'); // => "value"
mx.cookie('nothing'); // => undefined
Read all available cookies:

mx.cookie(); // => { "name": "value" }
Delete cookie:

// Returns true when cookie was successfully deleted, otherwise false
mx.removeCookie('name'); // => true
mx.removeCookie('nothing'); // => false

// Need to use the same attributes (path, domain) as what the cookie was written with
mx.cookie('name', 'value', { path: '/' });
// This won't work!
mx.removeCookie('name'); // => false
// This will work!
mx.removeCookie('name', { path: '/' }); // => true
