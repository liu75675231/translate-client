const path = require('path');

module.exports = {
  mode: "development",
  entry: {
      background: './src/background.js',
      contentScript: './src/contentScript.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
};