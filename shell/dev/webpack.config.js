const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js',
    },
    module: {
      rules: [
        {
          test: /\.(css)$/i,
          loader: "file-loader",
          options: {
            name: "[name].css",
          },
        },
      ],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist",
        hot: true,
        proxy: {
          "/bing": {
            target: "https://cn.bing.com/",
            changeOrigin: true,
            pathRewrite: {
              '/bing': '/'
            }
          }
          
        }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '开发环境',
        template: path.resolve(__dirname, 'index.html'),
        chunks: "index"
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
}
