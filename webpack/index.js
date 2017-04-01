const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const fs = require('fs');
const chalk = require('chalk');

const CWD = process.cwd();
const pkg = require('../package.json');

module.exports = envArgs => {
	console.log(chalk.green(`Webpack Production Setup v${pkg.version} (node ${process.version})`)); // eslint-disable-line
	const envConfig = require('./config')(envArgs || {});

    if (envConfig.copyConfig) {
        [
			'template.eslintrc.yml',
			'template.babelrc'
		].forEach(file => {
			const localPath = path.join(__dirname, file);
			const projectPath = path.join(process.cwd(), file.replace('template', ''));
			fs.writeFileSync(projectPath, fs.readFileSync(localPath));
			console.log(`${projectPath} --> ${localPath}`); // eslint-disable-line no-console
		});
    }

	const config = {
		entry: envConfig.entry,
		devtool: envConfig.isProd ? false : envConfig.devtool,
		output: {
			publicPath: '/',
			path: path.join(CWD, 'build'),
			filename: '[name].[hash].js'
		},
		target: 'web',
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
			new WebpackCleanupPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(envConfig.isProd ? 'production' : 'development')
			}),
			new HtmlWebpackPlugin({
				template: envConfig.htmlTemplate || path.resolve(CWD, 'src', 'index.html'),
				minify: {
					removeComments: envConfig.isProd,
					collapseWhitespace: envConfig.isProd,
					collapseInlineTagWhitespace: envConfig.isProd
				}
				// "files": {
				// 	"css": ["main.css"],
				// 	"js": ["assets/head_bundle.js", "assets/main_bundle.js"],
				// 	"chunks": {
				// 		"head": {
				// 			"entry": "assets/head_bundle.js",
				// 			"css": ["main.css"]
				// 		},
				// 		"main": {
				// 			"entry": "assets/main_bundle.js",
				// 			"css": ["main.css"]
				// 		}
				// 	}
				// }
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
		config.plugins.unshift(new WebpackCleanupPlugin());
		if(!envConfig.noUgly) config.plugins.push(new webpack.optimize.UglifyJsPlugin());
		config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
		if (envConfig.gzip) {
			config.plugins.push(new CompressionPlugin({
				asset: "[path].gz[query]",
				algorithm: "gzip",
				test: /\.(css|js|html)$/,
				threshold: 10240,
				minRatio: 0.8
			}));
		}
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
	return config;
};
