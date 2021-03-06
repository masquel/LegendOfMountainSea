const path = require('path'),
	webpack = require('webpack'),
	CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
	output: {
		path: path.resolve(__dirname, '../'),
		filename: 'loms.game.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						plugins: [
							require('babel-plugin-transform-object-rest-spread'),
							require('babel-plugin-transform-class-properties'),
						],
					},
				},
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'html-es6-template-loader',
					options: {
						transpile: true,
					},
				},
			},
		],
	},
	resolve: {
		alias: {
			'pixi': path.resolve(__dirname, '/node_modules/pixi.js/bin/pixi.min.js'),
		},
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true,
			cwd: process.cwd(),
		}),
	],
};