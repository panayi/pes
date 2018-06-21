/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const constants = require('../constants');

const outputPath = path.join(constants.paths.build, constants.folders.devops);

module.exports = merge.smart(baseConfig, {
  entry: path.join(constants.paths.devops, 'src', 'index.js'),
  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(constants.paths.root, 'node_modules'),
      path.join(constants.paths.devops, 'src'),
    ],
  },
  output: {
    path: outputPath,
    filename: 'index.js',
    libraryTarget: 'this',
  },
  node: {
    __dirname: false,
  },
});
