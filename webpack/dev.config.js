var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var assetsPath = path.resolve(__dirname, '../static/dist');
var host = 'localhost';
var port = parseInt(process.env.PORT) + 1 || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync(path.resolve(__dirname, '../.babelrc'));
var babelConfig;

try {
    babelConfig = JSON.parse(babelrc);
    babelConfig.env.development.presets.push("react-hmre")
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

module.exports = {
    devtool: "eval-cheap-module-source-map",
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
            './src/client.js'
        ]
    },
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: 'http://' + host + ':' + port + '/dist/'
    },
    module: {
        loaders: [
            {test: /\.js$/, include: /src/, loader: 'babel', query: babelConfig },
            {test: /\.json$/, loader: 'json-loader'},
            {
                test: /\.css$/,
                loader: 'style!css?modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss'
            },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'}
        ]
    },
    postcss: function () {
        return [
            require('postcss-import'),
            require('rucksack-css'),
            require('lost'),
            require('autoprefixer'),
            require('precss')
        ]
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
        // hot reload
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
        }),
        webpackIsomorphicToolsPlugin.development()
    ]
};
