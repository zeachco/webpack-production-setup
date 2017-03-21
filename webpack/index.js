const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const CWD = process.cwd();

module.exports = envArgs => {
	console.log(`node ${process.version}`); // eslint-disable-line
	const envConfig = require('./config')(envArgs || {});
	const config = {
		entry: envConfig.entry,
		devtool: envConfig.isProd ? false : envConfig.devtool,
		output: {
			publicPath: '/',
			path: path.join(CWD, 'build'),
			filename: '[name].[hash].js'
		},
		resolve: {
			extensions: ['.js', '.jsx', '.css', '.scss', '.less'],
			modules: [
				path.join(CWD),
				path.join(CWD, 'node_modules'),
				path.join(envConfig.srcPath)
			]
		},
		module: {
			loaders: require('./loaders')(envConfig)
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(envConfig.isProd ? 'production' : 'development')
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(CWD, 'src', 'index.html'),
				minify: {
					removeComments: envConfig.isProd,
					collapseWhitespace: envConfig.isProd,
					collapseInlineTagWhitespace: envConfig.isProd
				}
			}),
			new ExtractTextPlugin({
				filename: '[name].[hash].css',
				allChunks: true
			}),
			new ManifestPlugin(),
			new AppCachePlugin({
				output: Date.now() + 'manifest.appcache'
			})
		]
	};

	if (envConfig.favicon) {
		config.plugins.push(new FaviconsWebpackPlugin(path.join(process.cwd(), envConfig.favicon)));
	}

	if (envConfig.isProd) {
		config.plugins.push(new WebpackCleanupPlugin());
		config.plugins.push(new BabiliPlugin());
		config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
	} else {
		if (envConfig.hot) { // add patch to all entries
			for (var key in config.entry) {
				if (config.entry.hasOwnProperty(key)) {
					config.entry[key] = ['react-hot-loader/patch', config.entry[key]];
				}
			}
		}
		config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
		config.devServer = require('./server')(envConfig);
	}
	console.log(config);
	return config;
};
