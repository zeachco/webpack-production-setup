const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";

module.exports = envConfig => ({
	contentBase: "./public",
	hot: true, // enable HMR
	inline: true, // embed the webpack-dev-server runtime into the bundle
	historyApiFallback: true, // serve index.html in place of 404 responses to allow HTML5 history
	port: PORT,
	host: HOST,
	proxy: {
		// "/cdn/*": {
		// 	target: {
		// 		host: "127.0.0.1",
		// 		protocol: 'https',
		// 		port: 443
		// 	},
		// 	changeOrigin: false,
		// 	secure: true
		// }
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
		colors: {
			green: '\u001b[32m'
		}
	}
});
