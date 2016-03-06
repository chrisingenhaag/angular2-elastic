var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var default_config = {
    devServer: {
        stats: 'errors-only',
    },
    resolve: {
        extensions: ['', '.ts', '.json', '.js', ".less", ".sass"]
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw" },
            { test: /\.css$/, loader: "raw" },
            { test: /\.(png|jpg)$/, loader: "url?limit=25000" },
            { test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$|\.otf$/, loader: "file" },
            { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: ['node_modules'],
                query: {
                    ignoreDiagnostics: [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375, // 2375 -> Duplicate string index signature
                    ]
                },
            }
        ],
    }
};

module.exports = webpackMerge(default_config, {
    entry: {
        main: ['./src/bootstrap.ts'],
        vendors: ['./src/vendors.ts']
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].js',
        publicPath: '/build/',
        pathinfo: false
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
        new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js", Infinity),
        new HtmlWebpackPlugin({ template: 'src/index.html' })
    ],
    devServer: {
        host: 'localhost',
        port: 3030,
    }
});
