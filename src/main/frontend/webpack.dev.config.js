const common = require('./webpack.common.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = (env) => {
	let result = common(env);
	
	result.devtool = '#cheap-source-map';
	
	result.plugins.push(new ExtractTextPlugin({
		disable: true
	}));
	
	return result;
}

module.exports = config;
