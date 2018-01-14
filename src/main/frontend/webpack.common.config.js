const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetGraphPlugin = require('asset-graph-webpack-plugin');

module.exports = (env) => {
	return {
		entry : {
			commons: [
				'preact'
			]
		},
		output : {
			publicPath : '/',
			path: env.outputDirectory,
			filename : 'public/[name]-[hash].bundle.js',
			chunkFilename: 'public/[name]-[chunkhash].bundle.js',
			sourceMapFilename: '[file].map'
		},
		plugins : [
			new webpack.NoEmitOnErrorsPlugin(),
			new HtmlWebpackPlugin({
				template: './index.ejs',
				minify: {
					collapseWhitespace: true
				}
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'commons',
				filename: 'commons.js'
			}),
			// new AssetGraphPlugin(path.join(env.outputDirectory, 'assets.json'))
		],
		resolve : {
			extensions : [ '.tsx', '.ts', '.js' ]
		},
		module : {
			loaders : [ {
				test : /\.s[c|a]ss$/,
				use : ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [ {
							loader : "typings-for-css-modules-loader",
							options : {
								camelCase : true,
								namedExport : true,
								modules : true,
								importLoaders : 1,
								sourceMap: true,
								localIdentName: 'pfy_[hash:base64:5]'
							}
						}, {
							loader: "sass-loader",
							options: {
			                    sourceMap: true
			                }
						}]
				})
			}, {
				test : /\.tsx$/,
				loader : 'ts-loader',
				exclude : /node_modules/,
				options : {
					configFile : "./tsconfig.json",
					compilerOptions: {
						outDir: env.outputDirectory
					}
				}
			} ]
		}
	}
};
