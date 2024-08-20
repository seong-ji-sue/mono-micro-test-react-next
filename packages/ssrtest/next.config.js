const path = require('path');

module.exports = {
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx'],
	webpack: (config) => {
		config.resolve.modules.push(path.resolve('./src'));
		return config;
	},
};
