var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = require('./webpack.config');

delete config.entry.hmr;

config.devtool = 'source-map';
config.output.publicPath = '/static/dist/';

config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    }),
    new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
            mangle: false,
        },
    }),
    new BundleTracker({ filename: './webpack-stats.json' }),
];

module.exports = config;
