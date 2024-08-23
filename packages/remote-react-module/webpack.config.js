const dotenv = require('dotenv');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;
const webpack = require('webpack');
const {ModuleFederationPlugin} = webpack.container;

module.exports = () => {
	const common = {
		mode: 'development',
		entry: './src/index.js',
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		devtool: 'source-map',
		devServer: {
			server: 'http',
			host: '0.0.0.0',
			port: 3001,
			open: true,
			historyApiFallback: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'app.js',
			publicPath: 'http://localhost:3001/',
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {presets: ['@babel/env', '@babel/preset-react']},
					},
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: 'html-loader',
							options: {
								minimize: true,
							},
						},
					],
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader', 'sass-loader'],
				},
				{
					test: /\.(jpg|png|svg)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 25000,
						},
					},
				},
			],
		},

		plugins: [
			new ModuleFederationPlugin({
				name: 'remote_react_module',
				filename: 'remoteEntry.js',
				exposes: {
					'./Admin': './src/AdminTest.js',
				},
				shared: {
					react: {
						singleton: true,
						// eager: true,
						requiredVersion: false,
					},
					// 'react-dom': {
					// 	singleton: true,
					// 	// eager: true,
					// 	requiredVersion: deps['react-dom'],
					// },
					// 'react-router-dom': {
					// 	singleton: true,
					// 	// eager: true,
					// 	requiredVersion: deps['react-router-dom'],
					// },
				},
			}),
			new HtmlWebpackPlugin({
				template: 'public/index.html',
			}),
			new webpack.DefinePlugin({}),
		],
	};

	return common;
};
