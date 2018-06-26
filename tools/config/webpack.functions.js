/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const apps = require('../../packages/core/src/config/apps');
const constants = require('../constants');
const baseConfig = require('./webpack.base.js');

const outputPath = path.join(
  constants.paths.build,
  constants.folders.functions,
);

module.exports = entries =>
  merge.smart(baseConfig, {
    resolve: {
      extensions: ['.js'],
      modules: ['node_modules', path.join(constants.paths.application, 'src')],
    },
    entry: entries,
    output: {
      // To deploy functions, package.json and node_modules
      // needs to be at the same directory level.
      path: outputPath,
      filename: '[name].js',
      libraryTarget: 'this',
    },
    plugins: [
      new Dotenv({
        path: path.join(constants.paths.root, '.env'),
      }),
      new webpack.DefinePlugin({
        'process.env.REACT_APP_APP': JSON.stringify(apps.APPLICATION.name),
      }),
    ],
  });
