const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";

module.exports = envConfig => ({
	contentBase: "./build",
	hot: true,
	inline: true,
	historyApiFallback: true,
	port: PORT,
	host: HOST,
	proxy: {
		"/api/*": {
			target: {
				host: "127.0.0.1",
				protocol: 'http',
				port: 8080
			},
			changeOrigin: true,
			secure: false
		}
	},
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
