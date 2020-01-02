const path = require('path');

module.exports = {
	mode: "production",
	entry: {
		scottUtils: "./index.js"
	},
	output: {
		library: "scottUtils",
		libraryTarget: "umd",
		filename: "scott-utils.min.js",
		libraryExport: "default",
		path: path.resolve(__dirname, '../dist/')
	},
	optimization: {
		minimize: true
	}
}