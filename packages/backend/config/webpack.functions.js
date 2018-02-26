/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPreBuildPlugin = require('pre-build-webpack');
const baseConfig = require('./webpack.base.js');
const constants = require('./constants');
const build = require('./scripts/build.functions.js');

const outputPath = path.join(constants.paths.build, constants.folders.functions);

module.exports = merge.smart(baseConfig, {
  entry: path.join(constants.paths.functions, constants.files.functionsInput),
  output: {
    // To deploy functions, package.json and node_modules
    // needs to be at the same directory level.
    path: outputPath,
    filename: 'functions.js',
    libraryTarget: 'this',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_FIREBASE_FUNCTIONS_ENV': true,
    }),
    new WebpackPreBuildPlugin(build),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'functions.index.js.template'),
        to: path.join(outputPath, 'index.js'),
      },
      {
        from: path.join(constants.paths.web, 'server', 'build', 'server.bundle.js'),
        to: path.join(outputPath, 'server.bundle.js'),
      }
    ])
  ],
});
