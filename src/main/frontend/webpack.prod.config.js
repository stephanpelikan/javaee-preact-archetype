const webpack = require('webpack');
const glob = require('glob-all');
const path = require('path');
const common = require('./webpack.common.config');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let config = (env) => {
	let config = common(env);

	config.devtool = '#source-map';
	
	config.entry.app = './main-prod.tsx';
	
	config.output.filename = 'public/[name].[chunkhash].js';

	config.plugins.push(new CompressionPlugin({
	}));
	
	config.plugins.push(new webpack.LoaderOptionsPlugin({
		minimize: true
	}));

	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
		compress: {
			unused: 1,
			warnings: 0,
			comparisons: 1,
			conditionals: 1,
			negate_iife: 0, // <- for `LazyParseWebpackPlugin()`
			dead_code: 1,
			if_return: 1,
			join_vars: 1,
			evaluate: 1
		},
		mangle : true,
		output: {
			comments: false
		}
	}));
	
	config.plugins.push(new ExtractTextPlugin({
		filename: "[name].css",
		allChunks: true
	}));
	
	/*
	 * config.plugins.push(new OptimizeCssAssetsPlugin({ cssProcessor:
	 * require('cssnano'), cssProcessorOptions: { safe: true, map: { inline:
	 * false }, discardComments: { removeAll: true } }, canPrint: true }));
	 */
	
	config.plugins.push(new PurifyCSSPlugin({
		paths: glob.sync([
			  path.join(env.outputDirectory, '*.html'),
			  path.join(env.outputDirectory, '**/*.js'),
			  path.join(__dirname, '**/*.tsx')
			]),
		purifyOptions: {
			info: true,
			minify: false,
			whitelist: [ '*pfy*']
		}
	}));

	/*
	 * new SWPrecache({ minify: true, filename: 'sw.js',
	 * dontCacheBustUrlsMatching: /./, navigateFallback: 'index.html',
	 * staticFileGlobsIgnorePatterns: [/\.map$/] })
	 */
	
	return config;
}

module.exports = config;
