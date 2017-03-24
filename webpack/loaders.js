module.exports = envConfig => {
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    const naming = 'name=assets/[path][name]_[hash].[ext]';
    const inlineImageFileSize = 'limit=' + envConfig.inlineImageFileSize;
    const loaders = [{
        test: /\.html?$/,
        loader: "html-loader"
    }, {
        test: /\.json5?$/,
        loader: "json5-loader"
    }, {
        test: /\.(eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        include: /(src|cms-core|auto-bind)/,
        loader: `file-loader?${naming}`
    }, {
        test: /\.(woff|woff2)$/,
        exclude: /(node_modules|bower_components)/,
        loader: `url-loader?${naming}&limit=5000`
    }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=application/octet-stream'].join('&')
    }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=image/svg+xml'].join('&')
    }, {
        test: /\.gif/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=image/gif'].join('&')
    }, {
        test: /\.jpg/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=image/jpg'].join('&')
    }, {
        test: /\.png/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?' + [naming, inlineImageFileSize, 'mimetype=image/png'].join('&')
    }];

    const javascriptLoader = {
        test: /\.jsx?$/,
        include: [/src|node_modules\/src(?!.*\.min\.js)/],
        loaders: ['babel-loader']
    };

    if (envConfig.eslint) {
        const fs = require('fs');
        const path = require('path');
        const eslintFile = '.eslintrc.yml';
        const projectEslintPath = path.join(process.cwd(), eslintFile);
        const localEslintPath = path.join(__dirname, '..', eslintFile);
        if(!fs.existsSync(projectEslintPath)) fs.writeFileSync(projectEslintPath, fs.readFileSync(localEslintPath));
        javascriptLoader.loaders.push('eslint-loader');
    }

    loaders.unshift(javascriptLoader);

    if (envConfig.isProd) {
        loaders.push({
            test: /\.scss$/,
            exclude: /(bower_components|node_modules)/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?sourceMap&outputStyle=expanded'
            })
        }, {
            test: /\.css$/,
            exclude: /(bower_components|node_modules)/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]'
            })
        });
    } else {
        loaders.push({
            test: /\.s(c|a)ss$/,
            exclude: /(bower_components|node_modules)/,
            loaders: ['style-loader?sourceMap', 'css-loader?sourceMap&importLoaders=1', 'sass-loader?sourceMap']
        }, {
            test: /\.css$/,
            exclude: /(bower_components|node_modules)/,
            loaders: ['style-loader?sourceMap', 'css-loader?sourceMap&importLoaders=1']
        });
    }
    return loaders;
}
