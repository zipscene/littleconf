const LittleConf = require('./littleconf');

module.exports.getConfig = function(options = {}) {
	if (module.exports.config) return module.exports.config;
	let lc = new LittleConf(options);
	module.exports.config = lc.loadConfig();
	return module.exports.config;
};

module.exports.config = null;

