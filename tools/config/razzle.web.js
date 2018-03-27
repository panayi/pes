/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BUILD_PATH = path.join(__dirname, '..', '..', 'build', 'web');

module.exports = {
  modify(config, { target, dev }) {
    const appConfig = config; // stay immutable here

    if (target === 'node' && !dev) {
      appConfig.entry = path.join(
        __dirname,
        '..',
        '..',
        'packages',
        'web',
        'src',
        'server.js',
      );
      appConfig.output.path = path.join(BUILD_PATH, 'server');
      appConfig.output.filename = 'server.bundle.js';
      appConfig.output.libraryTarget = 'commonjs2';
    }

    if (target === 'web' && !dev) {
      appConfig.plugins = [
        ...appConfig.plugins,
        // TODO: remove once we upgrade razzle/after.js
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebookincubator/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
            },
          },
          sourceMap: true,
        }),
      ];
    }

    if (target === 'node') {
      appConfig.resolve.mainFields = ['main', 'module'];
    }

    return appConfig;
  },
};
