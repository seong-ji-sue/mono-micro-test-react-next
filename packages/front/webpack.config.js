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
		publicPath: 'http://localhost:3000/',
	},
	devtool: 'source-map',
	devServer: {
		port: 3000,
		open: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
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
			filename: 'static/chunks/remoteEntry.js',
			remotes: {
				admin: 'admin@http://localhost:3002/remoteEntry.js',
			},
			exposes: {},
			// shared: {
			// 	...deps,
			// 	react: {
			// 		singleton: true,
			// 		requiredVersion: deps.react,
			// 	},
			// 	'react-dom': {
			// 		singleton: true,
			// 		requiredVersion: deps['react-dom'],
			// 	},
			// 	'react-router-dom': {
			// 		singleton: true,
			// 		requiredVersion: deps['react-router-dom'],
			// 	},
			// },react-router-dom
		}),
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
	],
};
