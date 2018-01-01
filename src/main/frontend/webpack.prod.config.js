const webpack = require('webpack');
const common = require('./webpack.common.config');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = (env) => {
	let result = common(env);

	result.devtool = '#source-map';

	result.plugins.push(new CompressionPlugin({
	}));
	
	result.plugins.push(new webpack.LoaderOptionsPlugin({
		minimize: true
	}));

	result.plugins.push(new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
		compress : {
			warnings : false
		},
		mangle : true,
		output: {
			comments: false
		}
	}));
	
	result.plugins.push(new ExtractTextPlugin({
		filename: "styles.css",
		allChunks: true
	}));
	
	return result;
}

module.exports = config;
