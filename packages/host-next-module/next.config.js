const path = require('path');
const {NextFederationPlugin} = require('@module-federation/nextjs-mf');
const dotenv = require('dotenv');
const deps = require('./package.json').dependencies;
const webpack = require('webpack');

// 환경 변수 로드
dotenv.config();

module.exports = {
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx'],

	// Webpack 설정
	webpack: (config, {isServer}) => {
		if (!isServer) {
			config.plugins.push(
				new NextFederationPlugin({
					name: 'host_next_module',
					filename: 'static/chunks/remoteEntry.js',
					remotes: {
						remote_react_module:
							'remote_react_module@http://localhost:3001/remoteEntry.js',
						remote_next_module:
							'remote_next_module@http://localhost:3002/_next/static/chunks/remoteEntry.js',
					},
					shared: {
						'next/navigation': {singleton: true},
						'next/router': {singleton: true},
						react: {
							singleton: true,
							// eager: true,
							requiredVersion: false,
						},
						'react-dom': {
							singleton: true,
							// eager: true,
							requiredVersion: deps['react-dom'],
						},
						// 'react-router-dom': {
						// 	singleton: true,
						// 	// eager: true,
						// 	requiredVersion: deps['react-router-dom'],
						// },
					},
				}),
			);
		}

		return config;
	},
};
