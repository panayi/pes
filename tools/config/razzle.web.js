/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const BUILD_PATH = path.join(__dirname, '..', '..', 'build', 'web');

module.exports = {
  modify(config, { target, dev }) {
    const appConfig = config; // stay immutable here

    appConfig.module.rules[0].include = [
      appConfig.module.rules[0].include,
      path.join(__dirname, '..', '..', 'packages/core/src'),
    ];
    appConfig.module.rules[0].use[0].options.baseConfig = require.resolve(
      '../../.eslintrc.js',
    );
    appConfig.module.rules[1].include = [
      ...appConfig.module.rules[1].include,
      path.join(__dirname, '..', '..', 'packages/core/src'),
    ];

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

    if (target === 'node') {
      appConfig.resolve.mainFields = ['main', 'module'];
    }

    return appConfig;
  },
};
