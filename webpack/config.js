const Defaults = {
  isProd: false
};

module.exports = envArgs => {
  const config = Object.assign({}, Defaults, envArgs)
  config.isProd = !!config.isProd || process.NODE_ENV === 'production'
	return config;
};
