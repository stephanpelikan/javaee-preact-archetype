const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
	return {
		entry : [ './main.tsx' ],
		output : {
			publicPath : '/',
			path: env.outputDirectory,
			filename : './public/bundle.js',
			sourceMapFilename: '[file].map'
		},
		plugins : [
			new webpack.NoEmitOnErrorsPlugin(),
			new HtmlWebpackPlugin({
				template: './index.ejs',
				minify: { collapseWhitespace: true }
			})
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
								sourceMap: true
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
