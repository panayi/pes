/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.js');
const constants = require('./constants');

const outputPackageJson = (content) => {
  const obj = R.compose(
    JSON.stringify,
    R.evolve({
      dependencies: R.pickBy((val, key) => !R.test(/^pesposa/, key))
    }),
    R.omit(['devDependencies']),
    JSON.parse
  )(content.toString());

  return obj;
}

const outputPath = path.join(constants.paths.build, constants.folders.functions);

module.exports = merge.smart(baseConfig, {
  entry: path.join(constants.paths.functions, constants.files.functionsInput),
  output: {
    // To deploy functions, package.json and node_modules
    // needs to be at the same directory level.
    path: outputPath,
    filename: constants.files.functionsOutput,
    libraryTarget: 'this',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_FIREBASE_FUNCTIONS': true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(constants.paths.backendRoot, 'package.json'),
        to: path.join(outputPath, 'package.json'),
        transform: outputPackageJson
      }
    ])
  ],
});
