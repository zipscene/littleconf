const LittleConf = require('./littleconf');
const sha1 = require('sha1');

let configCache = {};

module.exports.getConfig = function(options = {}) {
	let optionsHash = sha1(JSON.stringify(options));
	if (configCache[optionsHash]) return configCache[optionsHash];
	let lc = new LittleConf(options);
	configCache[optionsHash] = lc.loadConfig();
	return configCache[optionsHash];
};


