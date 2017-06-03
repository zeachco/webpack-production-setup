const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = envConfig => {
    const naming = 'name=[path][name]_[hash].[ext]';
    const inlineImageFileSize = 'limit=' + envConfig.inlineImageFileSize;

    const loaders = [{
        test: /\.html?$/,
        loader: "html-loader"
    }, {
        test: /\.json5?$/,
        loader: 'json5-loader'
    }, {
        test: /\.(eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: `file-loader?${naming}`
    }, {
        test: /\.(woff|woff2)$/,
        exclude: /node_modules/,
        loader: `url-loader?${naming}&limit=5000`
    }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=application/octet-stream'].join('&')
    }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=image/svg+xml'].join('&')
    }, {
        test: /\.gif/,
        exclude: /node_modules/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=image/gif'].join('&')
    }, {
        test: /\.jpg/,
        exclude: /node_modules/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=image/jpg'].join('&')
    }, {
        test: /\.png/,
        exclude: /node_modules/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=image/png'].join('&')
    },
    ...envConfig.additionnalLoaders
    ];

    const javascriptLoader = {
        test: /\.jsx?$/,
        include: [/src/, ...envConfig.es6Modules],
        loaders: ['babel-loader']
    };

    if (envConfig.eslint) {
        javascriptLoader.loaders.push({
            loader: 'eslint-loader',
            options: {
                failOnError: false,// TODO: envConfig.isProd,
                failOnWarning: false,
                emitWarning: true,// TODO: !envConfig.isProd
            }
        });
    } else {
        console.warn(chalk.red('eslint is disabled')); // eslint-disable-line no-console
    }

    loaders.unshift(javascriptLoader);

    const styleLoader = {
        loader: 'style-loader',
        options: {
            sourceMap: true
        }
    };
    const cssLoader = {
        loader: 'css-loader',
        options: {
            importLoaders: '1'
        }
    };
    const postCssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            browsers: [
                'last 2 version',
                'Safari >= 6.1',
                'Explorer >= 11'
            ]
        }
    };
    const sassLoader = {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
            outputStyle: 'expanded'
        }
    };
    if (envConfig.isProd) {
        loaders.push({
            test: /\.s(a|c)ss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: envConfig.prefixer ? [cssLoader, postCssLoader, sassLoader] : [cssLoader, sassLoader]
            }),
            exclude: ['node_modules']
        });
        loaders.push({
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: envConfig.prefixer ? [cssLoader, postCssLoader] : [cssLoader]
            }),
            exclude: ['node_modules']
        });
    } else {
        loaders.push({
            test: /\.s(a|c)ss$/,
            use: envConfig.prefixer ? [styleLoader, cssLoader, postCssLoader, sassLoader] : [styleLoader, cssLoader, sassLoader],
            exclude: ['node_modules']
        });
        loaders.push({
            test: /\.css$/,
            use: envConfig.prefixer ? [styleLoader, cssLoader, postCssLoader] : [styleLoader, cssLoader],
            exclude: ['node_modules']
        });
    }
    return loaders;
};
