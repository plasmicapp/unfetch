function r(m){return m && m.default || m;}
module.exports = function(url, opts) {
  return r(require('node-fetch-cjs'))(String(url).replace(/^\/\//g,'https://'), opts);
};
