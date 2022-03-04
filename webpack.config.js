const webpack			= require('webpack');

module.exports = {
    target: 'node',
    mode: 'production', // production | development
    entry: [ './src/index.js' ],
    output: {
	filename: 'repr.bundled.js',
	globalObject: 'this',
	library: {
	    "name": "repr",
	    "type": "umd",
	},
    },
    stats: {
	colors: true
    },
    devtool: 'source-map',
};
