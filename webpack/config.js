const path = require('path');

const Defaults = {
	srcPath: path.join(process.cwd(), 'src'),
	entry: {
		main: './src'
	},
	devtool: 'cheap-module-eval-source-map',
	eslint: true,
	gzip: true,
	isProd: false,
	host: '127.0.0.1',
	port: 3000
};

module.exports = envArgs => {
  const config = Object.assign({}, Defaults, envArgs)
  config.isProd = !!envArgs.isProd || process.env.NODE_ENV === 'production'
	return config;
};
