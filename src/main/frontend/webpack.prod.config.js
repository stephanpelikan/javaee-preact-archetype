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
	
	/*
	const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
	new HtmlCriticalPlugin({
	   base: path.join(pah.resolve(__dirname), 'dist/')),
	   src: 'index.html',
	   dest: 'index.html',
	   inline: true,
	   minify: true,
	   extract: true,
	   width: 375,
	   height: 565,
	   penthouse: {
	     blockJSRequests: false
	});
	 */
	
	return result;
}

module.exports = config;
