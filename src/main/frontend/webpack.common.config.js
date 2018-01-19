const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetGraphPlugin = require('asset-graph-webpack-plugin');
const IdentifierNormalModulesPlugin = require('./IdentifierNormalModulesPlugin');

module.exports = (env) => {
	return {
		entry : {
			vendor: [
				'preact'
			]
		},
		output : {
			publicPath : '/',
			path: env.outputDirectory,
			chunkFilename: 'public/[name].[chunkhash].js',
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
			new webpack.NamedModulesPlugin(),
			new webpack.NamedChunksPlugin((chunk) => {
				if (chunk.name) {
					return chunk.name;
				}
				let n = [];
				chunk.forEachModule(m => n.push(path.relative(m.context, m.request)))
				return n.join(' ');
			}),
			new IdentifierNormalModulesPlugin(),
			new webpack.optimize.CommonsChunkPlugin({
				name: ['vendor'],
				minChunks: Infinity
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: ['runtime']
			}),
			// new AssetGraphPlugin(path.join(env.outputDirectory, 'assets.json'))
		],
		resolve : {
			alias: {
				'react': 'preact-compat',
				'react-dom': 'preact-compat',
				// Not necessary unless you consume a module using `createClass`
				'create-react-class': 'preact-compat/lib/create-react-class'
			},
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
