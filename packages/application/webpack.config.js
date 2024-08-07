const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: 'http://localhost:3002/',
	},
	devtool: 'source-map',
	devServer: {
		server: 'http',
		host: '0.0.0.0',
		port: 3002,
		open: false,
		historyApiFallback: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
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
			name: 'app',
			filename: 'remoteEntry.js',
			exposes: {
				'./Admin': './src/AdminTest.js',
			},
			shared: {
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
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
	],
};
