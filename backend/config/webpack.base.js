/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const constants = require('./constants');

module.exports = {
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', constants.paths.backend],
    alias: {
      frontend: constants.paths.frontend,
    },
  },
  externals: [nodeExternals()],
  plugins: [
    new Dotenv({
      path: path.join(constants.paths.root, constants.files.env),
    }),
  ],
};
