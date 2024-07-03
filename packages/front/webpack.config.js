//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/',
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
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
	],
};
