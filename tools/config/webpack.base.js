/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const constants = require('../constants');

module.exports = {
  target: 'node',
  mode: 'production',
  bail: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  'env',
                  {
                    targets: {
                      node: 'current',
                    },
                  },
                ],
              ],
              plugins: ['transform-async-to-generator'],
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'buffer-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.mjml$/,
        use: 'raw-loader',
      },
    ],
  },
  externals: [
    nodeExternals({
      whitelist: [/^@pesposa/],
      modulesDir: path.join(constants.paths.root, 'node_modules'),
    }),
  ],
};
