const path = require('path');

// Files
const ENV = '.env';
const FUNCTIONS_INPUT = 'index.js';
const ADMIN_INPUT = 'index.js';
const FUNCTIONS_OUTPUT = 'index.js';
const ADMIN_OUTPUT = 'index.js';

// Folders
const SRC = 'src';
const FRONTEND_SRC = 'src';
const ADMIN = 'admin';
const FUNCTIONS = 'functions';
const SHARED = 'shared';
const BUILD = 'build';

// Paths
const BACKEND_ROOT = path.join(__dirname, '..');
const BACKEND = path.join(BACKEND_ROOT, SRC);
const ROOT = path.join(BACKEND, '..', '..');
const FRONTEND = path.join(ROOT, FRONTEND_SRC);

module.exports = {
  files: {
    env: ENV,
    functionsInput: FUNCTIONS_INPUT,
    adminInput: ADMIN_INPUT,
    functionsOutput: FUNCTIONS_OUTPUT,
    adminOutput: ADMIN_OUTPUT,
  },
  folders: {
    admin: ADMIN,
    functions: FUNCTIONS,
    shared: SHARED,
    build: BUILD,
  },
  paths: {
    root: ROOT,
    backendRoot: BACKEND_ROOT,
    backend: BACKEND,
    frontend: FRONTEND,
    admin: path.join(BACKEND, ADMIN),
    functions: path.join(BACKEND, FUNCTIONS),
    build: path.join(BACKEND_ROOT, BUILD),
  },
};
