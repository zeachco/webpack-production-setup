const webpack = require('webpack');
const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const CWD = process.cwd();

module.exports = envArgs => {
	const envConfig = require('./config')(envArgs || {});
	const config = {
		entry: ['./src'],
		devtool: envConfig.isProd ? false : process.env.WEBPACK_DEVTOOL || '#inline-source-map',
		output: {
			publicPath: '/',
			path: join(CWD, 'public'),
			filename: '[name]_[hash].js'
		},
		resolve: {
			extensions: ['.js', '.jsx', '.css', '.scss', '.less'],
			modules: [
				resolve(CWD),
				resolve(CWD, 'node_modules'),
				resolve(CWD, 'src')
			]
		},
		module: { loaders: require('./loaders') },
		plugins: [
			new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(envConfig.isProd ? 'production' : 'development') } }),
			new ExtractTextPlugin({ filename: '[name].[hash].css', allChunks: true }),
			new ManifestPlugin(),
			new AppCachePlugin({ output: Date.now() + 'manifest.appcache' }),
			new HtmlWebpackPlugin({
				template: resolve(CWD, 'src', 'index.html'),
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					collapseInlineTagWhitespace: true
				},
				files: {
					css: ['[name]_[hash].css'],
					js: ["[name]_[hash].js"]
				}
			})
		]
	};

	if(envConfig.isProd) {
		config.plugins.push(new WebpackCleanupPlugin());
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}));
		config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
		config.module.loaders.push({
			test: /\.s(c|a)ss$/,
			loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader', allChunks: true}),
			exclude: ['node_modules']
		});
	} else {
		config.entry.unshift('react-hot-loader/patch');
		config.plugins.push(new webpack.HotModuleReplacementPlugin());
		config.plugins.push(new DashboardPlugin());
		config.module.loaders.push({
			test: /\.s(c|a)ss$/,
			loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
			exclude: ['node_modules']
		});
		config.devServer = require('./server')(envConfig);
	}
	console.info(config);
	return config;
};
