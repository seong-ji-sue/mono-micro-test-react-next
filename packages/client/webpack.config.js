const dotenv = require('dotenv');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;
const webpack = require('webpack');
const {ModuleFederationPlugin} = webpack.container;

module.exports = () => {
	dotenv.config({path: `../../config/.env.${process.env.NODE_ENV}`});
	console.log('WEBPACK - NODE_ENV: ----->' + process.env.NODE_ENV);

	const common = {
		mode: `${process.env.NODE_ENV}`,
		entry: './src/index.js',
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'app.js',
			publicPath: 'http://localhost:3000/',
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
				name: 'main',
				filename: 'remoteEntry.js',
				remotes: {
					app: 'app@http://localhost:3002/remoteEntry.js',
				},
				shared: {
					react: {
						singleton: true,
						eager: true,
					},
					'react-dom': {
						singleton: true,
						eager: true,
						requiredVersion: deps['react-dom'],
					},
					'react-router-dom': {
						singleton: true,
						eager: true,
					},
				},
			}),
			new HtmlWebpackPlugin({
				template: 'public/index.html',
			}),
			new webpack.DefinePlugin({}),
		],
	};
	if (process.env.NODE_ENV === 'development') {
		common.devtool = 'source-map';
		common.devServer = {
			server: 'http',
			host: '0.0.0.0',
			port: 3000,
			open: true,
			historyApiFallback: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		};
	} else {
		common.devtool = 'hidden-source-map';
	}
	return common;
};
