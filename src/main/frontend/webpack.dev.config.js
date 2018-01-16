const webpack = require('webpack');
const common = require('./webpack.common.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = (env) => {
	let config = common(env);
	
	config.devtool = '#eval'; // inline-source-map

	config.entry.app = './main-dev.tsx';
	
	config.output.filename = 'public/[name].[hash].js';

	config.devServer = {
		contentBase: env.outputDirectory,
		publicPath: config.output.publicPath,
		inline: true,
		hotOnly: true
	};
	
	config.plugins.push(new ExtractTextPlugin({
		disable: true
	}));

	config.plugins.push(new webpack.HotModuleReplacementPlugin());
	
	return config;
}

module.exports = config;
