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

	// CORS 설정 추가
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,HEAD,OPTIONS,POST,PUT',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'Origin, X-Requested-With, Content-Type, Accept, Authorization',
					},
				],
			},
		];
	},

	// Webpack 설정
	webpack: (config, {isServer}) => {
		if (!isServer) {
			config.plugins.push(
				new NextFederationPlugin({
					name: 'remote_next_module',
					filename: 'static/chunks/remoteEntry.js',
					exposes: {
						'./SsrTest': './src/component/SsrTest.js',
					},
					shared: {
						// 'next/navigation': {singleton: true},
						// 'next/router': {singleton: true},
						react: {
							singleton: true,
							eager: true,
							requiredVersion: deps.react,
						},
						'react-dom': {
							singleton: true,
							eager: true,
							requiredVersion: deps['react-dom'],
						},
						'react-router-dom': {
							singleton: true,
							eager: true,
							requiredVersion: deps['react-router-dom'],
						},
					},
				}),
			);
		}

		return config;
	},
};
