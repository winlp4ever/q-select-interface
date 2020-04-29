const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const source = path.resolve(__dirname, 'src');
const public = path.resolve(__dirname, 'public');

const webpack = require('webpack'); // @frontend
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pages = ['index'].map(name => {
    return new HtmlWebpackPlugin({
        inject: true,
        chunks: [name],
        filename: path.join(public, name),
        template: path.join(source, 'index.html')
    })
})
module.exports = merge(common, {
    entry: {
        'index': ['webpack-hot-middleware/client', '@babel/polyfill', './src/index.js'],
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './public',
        hot: true,
        host: 'localhost',
        port: 5000,
        compress: true,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //@frontend
        new CleanWebpackPlugin(),
        ...pages
    ]
});