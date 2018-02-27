const path = require('path');

const BUILD_PATH = path.join(__dirname, '..', '..', 'build', 'web');

module.exports = {
  modify(config, { target, dev }) {
    const appConfig = config; // stay immutable here

    if (target === 'node' && !dev) {
      appConfig.entry = path.join(__dirname, '..', '..', 'packages', 'web', 'src', 'server.js');
      appConfig.output.path = path.join(BUILD_PATH, 'server');        
      appConfig.output.filename = 'server.bundle.js';
      appConfig.output.libraryTarget = 'commonjs2';
    }

    return appConfig;
  },
}