function r(m){return m && m.default || m;}
module.exports = (typeof process == 'undefined'
		? global.fetch || r(require('unfetch'))
		: r(require('./dist/server'))
);
