'use strict';

var Dotenv = require('dotenv-webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js', // <-- Important
    libraryTarget: 'this' // <-- Important
  },
  target: 'node', // <-- Important
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  externals: [nodeExternals()], // <-- Important
  plugins: [
    new Dotenv({
      path: '../.env'
    })
  ]
};
