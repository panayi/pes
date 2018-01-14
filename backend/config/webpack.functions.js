/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const constants = require('./constants');

module.exports = merge.smart(baseConfig, {
  entry: path.join(constants.paths.functions, constants.files.functionsInput),
  output: {
    // To deploy functions, package.json and node_modules
    // needs to be at the same directory level.
    path: constants.paths.backend,
    filename: constants.files.functionsOutput,
    libraryTarget: 'this',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_FIREBASE_FUNCTIONS': true,
    }),
  ],
});
