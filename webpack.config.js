const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, './src'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new WebpackNotifierPlugin({
      title: 'WebComponents + HyperHTML',
      alwaysNotify: true
    })
  ],
  devServer: {
    contentBase: './'
  },
  resolve: {
    mainFields: ['browserify', 'browser', 'module', 'main']
  }
}