const path = require('path');

module.exports = envArgs => {
	const config = Object.assign({
		srcPath: path.join(process.cwd(), 'src'),
		copyConfig: true,
		entry: {
			main: 'src'
		},
		es6Modules: [/axios/],
		devtool: 'cheap-module-source-map',
		htmlTemplate: path.resolve(process.cwd(), 'src/index.html'),
		eslint: true,
		gzip: true,
		hot: true,
		isProd: false,
		host: '0.0.0.0',
		inlineImageFileSize: 10000, // size in bytes
		port: 3000
	}, envArgs);
	config.isProd = !!envArgs.isProd || process.env.NODE_ENV === 'production'
	return config;
};
