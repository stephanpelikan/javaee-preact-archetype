const webpack = require('webpack');
const common = require('./webpack.common.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = (env) => {
	let result = common(env);
	
	result.devtool = '#eval'; // inline-source-map

	result.entry.app = './main-dev.tsx';
	
	result.devServer = {
		contentBase: env.outputDirectory,
		publicPath: result.output.publicPath,
		inline: true,
		hotOnly: true
	};
	
	result.plugins.push(new ExtractTextPlugin({
		disable: true
	}));

	result.plugins.push(new webpack.NamedModulesPlugin());

	result.plugins.push(new webpack.HotModuleReplacementPlugin());
	
	return result;
}

module.exports = config;
