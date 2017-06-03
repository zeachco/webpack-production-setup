const path = require('path');

module.exports = envArgs => {
	const isProd = !!envArgs.isProd || process.env.NODE_ENV === 'production'
	const config = Object.assign({
		srcPath: path.join(process.cwd(), 'src'),
		entry: {
			main: 'src'
		},
		es6Modules: [/axios/],
		devtool: 'inline-eval',
		htmlTemplate: path.resolve(process.cwd(), 'src/index.html'),
		eslint: true,
		gzip: isProd,
		hot: !isProd,
		prefixer: true,
		isProd,
		host: '0.0.0.0',
		inlineImageFileSize: 10000, // size in bytes
		port: 3000,
		aliases: {},
		additionnalLoaders: []
	}, envArgs);
    
	if (config.fast) {
        config.prefixer = false;
    }

	if(config.hot && config.devtool==='eval') config.devtool = 'inline-eval';

	return config;
};
