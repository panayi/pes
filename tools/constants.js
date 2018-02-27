const path = require('path');

// Folders
const ADMIN = 'admin';
const FUNCTIONS = 'functions';
const SHARED = 'shared';
const BUILD = 'build';

// Paths
const ROOT = path.join(__dirname, '..');
const PACKAGES = path.join(ROOT, 'packages');

module.exports = {
  folders: {
    admin: ADMIN,
    functions: FUNCTIONS,
    shared: SHARED,
    build: BUILD,
  },
  paths: {
    root: ROOT,
    core: path.join(PACKAGES, 'core'),
    application: path.join(PACKAGES, 'application'),
    admin: path.join(PACKAGES, 'admin'),
    web: path.join(PACKAGES, 'web'),
    build: path.join(ROOT, 'build'),
  },
};
