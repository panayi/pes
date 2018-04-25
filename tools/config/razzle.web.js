/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const BUILD_PATH = path.join(__dirname, '..', '..', 'build', 'web');

module.exports = {
  modify(config, { target, dev }) {
    const appConfig = config; // stay immutable here

    appConfig.module.rules[0].include = [
      appConfig.module.rules[0].include,
      path.join(__dirname, '..', '..', 'packages/core/src'),
    ];
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

      appConfig.externals = [
        nodeExternals({
          whitelist: [
            /^@pesposa/,
            /\.(eot|woff|woff2|ttf|otf)$/,
            /\.(svg|png|jpg|jpeg|gif|ico)$/,
            /\.(mp4|mp3|ogg|swf|webp)$/,
            /\.(css|scss|sass|sss|less)$/,
          ].filter(x => x),
          modulesDir: path.join(__dirname, '..', '..', 'node_modules'),
        }),
      ];
    }

    if (target === 'node') {
      appConfig.resolve.mainFields = ['main', 'module'];
    }

    return appConfig;
  },
};
