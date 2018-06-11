/**
 * Created by v.denisov on 05.04.17.
 */
const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

try {
    var devServerConfig = require('./devserver.local.config');
} catch (ex) {
    var devServerConfig = require('./devserver.base.config');
}


module.exports = {
    devtool: 'eval-source-map',

    entry: {
        base: [
            'js/index.jsx'
        ],
    },

    output: {
        path: path.resolve('./static/dist/'),
        filename: '[name].[hash].entry.js',

        // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
        publicPath: devServerConfig.publicPath,
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
        new BundleTracker({filename: './webpack-stats.json'}),

        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ],

    module: {
        rules: [
            {
                test: /\.(jsx?|es6)$/,
                exclude: [
                    /node_modules/,
                ],
                use: [
                    {
                        loader:'babel-loader',
                        options: {
                            presets: [ 'react', 'es2015', 'stage-1' ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    }
                ],
            },
            {
                test: /\.(png|svg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 100000
                        }
                    }
                ],
            },
            {
                test: /\.gif$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ],
    },

    resolve: {
        modules: [
            `${__dirname}/static`,
            'node_modules'
        ],
        symlinks: false,
        extensions: ['.js', '.es6', '.jsx']
    },

    target: 'web',

    devServer: {
        hot: true,
        contentBase: devServerConfig.publicPath,
        port: devServerConfig.port,
        headers: {"Access-Control-Allow-Origin": "*"}
    }
};
