const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./build",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: '开发环境',
          template: path.resolve(__dirname, 'index.html'),
        })
      ],
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js',
    },
}