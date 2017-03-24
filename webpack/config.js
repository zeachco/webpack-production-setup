const path = require('path');

module.exports = envArgs => {
	const config = Object.assign({
		srcPath: path.join(process.cwd(), 'src'),
		entry: {
			main: 'src'
		},
		devtool: '#cheap-module-eval-source-map',
		htmlTemplate: path.resolve(process.cwd(), 'src/index.html'),
		eslint: true,
		gzip: true,
		hot: true,
		isProd: false,
		host: '127.0.0.1',
		inlineImageFileSize: 10000, // size in bytes
		port: 3000
	}, envArgs);
	config.isProd = !!envArgs.isProd || process.env.NODE_ENV === 'production'
	return config;
};
