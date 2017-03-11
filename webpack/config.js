const Defaults = {
	entry: {
		main: './src/index.jsx'
	},
	devtool: '#cheap-inline-source-map',
	eslint: true,
	isProd: false,
	host: '127.0.0.1',
	port: 3000
};

module.exports = envArgs => {
  const config = Object.assign({}, Defaults, envArgs)
  config.isProd = !!envArgs.isProd || process.env.NODE_ENV === 'production'
	return config;
};
