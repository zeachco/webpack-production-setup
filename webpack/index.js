'use strict';
const webpack = require('webpack');
const path = require('path');
const pkg = require(path.join(process.cwd(),'package.json'));
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const fs = require('fs');
const chalk = require('chalk');

const inject = obj => JSON.stringify(obj);

module.exports = envArgs => {
	console.log(chalk.green(`Webpack Production Setup v${pkg.version} (node ${process.version})`)); // eslint-disable-line

    const envConfig = require('./config')(envArgs || {});
    console.log(chalk.blue(JSON.stringify(envConfig, null, 2)));
    const config = {
        entry: {
            main: './src'
        },
        devtool: envConfig.isProd ? false : envConfig.devtool,
        output: {
            publicPath: '/',
            path: path.join(process.cwd(), 'build'),
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss', '.less'],
            modules: [
                envConfig.srcPath,
                path.resolve(process.cwd(), 'node_modules')
            ],
            alias: envConfig.aliases
        },
        module: { loaders: require('./loaders')(envConfig) },
        plugins: [
			new WebpackCleanupPlugin(),
            new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
            new webpack.DefinePlugin({ // expose nodejs variables (must be strings values)
                'process.env.NODE_ENV': inject(envConfig.isProd ? 'production' : 'development'),
                'process.env.PKG.version': inject(pkg.version)
            }),
            new HtmlWebpackPlugin({
                template: path.join(envConfig.srcPath, 'index.html'),
                inject: true,
                minify: {
                    collapsWhitespace: true,
                    removeComments: true,
                    collapseInlineTagWhitespace: true
                }
            })
        ]
    };

    if (envConfig.isProd) {
        config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }));
        config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
        config.plugins.push(new ExtractTextPlugin('/css/[name].css'));
        config.plugins.push(new ManifestPlugin());
        config.plugins.push(new AppCachePlugin({ output: Date.now() + 'manifest.appcache' }));
    } else {
        // add hot patch to all entries defined
        if (envConfig.hot) {
            for (let key in config.entry) {
                if (config.entry.hasOwnProperty(key)) {
                    if (typeof config.entry[key] === 'string') {
                        config.entry[key] = ['react-hot-loader/patch', config.entry[key]];
                    } else {
                        config.entry[key].unshift('react-hot-loader/patch');
                    }
                }
            }
        }
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.devServer = require('./server')(envConfig);
    }
    return config;
};
