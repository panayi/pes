/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const constants = require('./constants');

// FIXME: In addition to `pesposa-*` modules,
// we whitelist anyhting required by those `pesposa-*` modules
// This is because firebase deploy, is using package.json to install dependencies,
// and it fails as dependencies of `pesposa-*` modules are not available.
// This should be improved and be robust to other `pesposa-*` deps changes.
const whiteListNodeExternals = [
  /^pesposa/,
  'shortid',
];

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
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'buffer-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', constants.paths.backend],
  },
  externals: [
    nodeExternals({ whitelist: whiteListNodeExternals }),
    nodeExternals({ whitelist: whiteListNodeExternals, modulesDir: path.join(constants.paths.root, 'node_modules') })
  ],
  plugins: [
    new Dotenv({
      path: path.join(constants.paths.frontend, constants.files.env),
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          unused: true,
          dead_code: true,
        },
        output: {
          comments: false,
          beautify: false,
        }
      }
    })
  ],
};
