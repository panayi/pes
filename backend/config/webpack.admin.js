/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const constants = require('./constants');

module.exports = merge.smart(baseConfig, {
  entry: path.join(constants.paths.admin, constants.files.adminInput),
  output: {
    path: path.join(constants.paths.build, constants.folders.admin),
    filename: constants.files.adminOutput,
    libraryTarget: 'this',
  },
});
