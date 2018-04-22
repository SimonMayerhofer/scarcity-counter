const path = require('path');

module.exports = {
	build: {
		entry: [`${path.resolve()}/js/main.js`],
		output: {
			path: `${path.resolve()}/<%= paths.js.dest %>`,
			filename: '<%= paths.js.dist_file_name %>',
		},
		stats: {
			colors: false,
			modules: true,
			reasons: true,
		},
		storeStatsTo: 'webpackStats',
		progress: true,
		failOnError: true,
		watch: false,
		devtool: 'source-map',
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|vendor)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/env',
								'@babel/preset-react',
							],
							plugins: [
								'transform-class-properties',
								'@babel/plugin-proposal-object-rest-spread',
							],
						},
					},
				},
			],
		},
	},
};
