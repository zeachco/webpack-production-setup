module.exports = envConfig => ({
	contentBase: "./build",
	hot: true,
	inline: true,
	historyApiFallback: true,
	port: envConfig.port,
	host: envConfig.host,
	proxy: envConfig.proxy,
	stats: {
		assets: true,
		children: false,
		chunks: false,
		hash: true,
		modules: false,
		publicPath: true,
		timings: true,
		version: true,
		warnings: true,
		progress: true,
		colors: {
			green: '\u001b[32m'
		}
	}
});
