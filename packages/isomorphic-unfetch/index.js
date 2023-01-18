function r(m) {
	return (m && m.default) || m;
}
module.exports = (typeof process == "undefined"
		? global.fetch || r(require("unfetch"))
		: function (url, opts) {
				if (typeof url === "string" || url instanceof URL) {
					url = String(url).replace(/^\/\//g, "https://");
				}
				return import("node-fetch").then((m) => r(m)(url, opts));
		  });
