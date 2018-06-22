/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const baseConfig = require('./webpack.base.js');
const constants = require('../constants');

const outputPath = path.join(constants.paths.build, constants.folders.devops);

module.exports = paths => {
  const alias = {};
  let envPath = path.join(constants.paths.root, '.env');

  if (paths) {
    alias['@pesposa/core/src/config/serviceAccountKey.json'] =
      paths.serviceAccountKey;
    envPath = paths.env;
  }

  return merge.smart(baseConfig, {
    entry: path.join(constants.paths.devops, 'src', 'index.js'),
    resolve: {
      extensions: ['.js'],
      modules: [
        path.join(constants.paths.root, 'node_modules'),
        path.join(constants.paths.devops, 'src'),
      ],
      alias,
    },
    output: {
      path: outputPath,
      filename: 'index.js',
      libraryTarget: 'this',
    },
    node: {
      __dirname: false,
    },
    plugins: [
      new Dotenv({
        path: envPath,
      }),
    ],
  });
};
