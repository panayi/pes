module.exports = {
  extends: './.eslintrc.js',
  env: {
    jest: true
  },
  globals: {
    R: true,
    shallow: true,
    mount: true,
    withMockStore: true,
    noop: true,
  },
};
