const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		scottUtils: "./index.js"
	},
	output: {
		library: "scottUtils",
		libraryTarget: "umd",
		filename: "scott-utils.min.js",
		libraryExport: "default",
		path: path.resolve(__dirname, 'dist/')
	},
	optimization: {
		minimize: false
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "常用函数库",
			filename: "index.html",
			template: "index.html"
		})
	]
};