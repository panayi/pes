const path = require('path');
const R = require('ramda');

const root = process.cwd();

const getConfig = config => ({
  resolve: {
    ...config.resolve,
    modules: [...config.resolve.modules, path.join(root, 'src')],
  },
});

module.exports = function override(config) {
  return R.mergeDeepRight(config, getConfig(config));
};
