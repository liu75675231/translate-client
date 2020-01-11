const path = require('path');

module.exports = {
  mode: "development",
  entry: {
      background: './src/background.js',
      contentScript: './src/contentScript.js',
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
};