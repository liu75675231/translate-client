const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        "index": './src/index.js',
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
        contentBase: "./build",
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
      })
    ],
    devtool: 'cheap-module-source-map',
    output: {
        path: __dirname + "/build",
        filename: '[name].js',
    },
}
