const path = require('path');

// Folders
const DEVOPS = 'devops';
const FUNCTIONS = 'functions';
const SHARED = 'shared';
const BUILD = 'build';

// Paths
const ROOT = path.join(__dirname, '..');
const PACKAGES = path.join(ROOT, 'packages');

module.exports = {
  folders: {
    devops: DEVOPS,
    functions: FUNCTIONS,
    shared: SHARED,
    build: BUILD,
  },
  paths: {
    root: ROOT,
    core: path.join(PACKAGES, 'core'),
    serverCore: path.join(PACKAGES, 'server', 'core'),
    application: path.join(PACKAGES, 'server', 'application'),
    devops: path.join(PACKAGES, 'server', 'devops'),
    web: path.join(PACKAGES, 'client', 'web'),
    manager: path.join(PACKAGES, 'client', 'manager'),
    build: path.join(ROOT, 'build'),
  },
};
