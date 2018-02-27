const path = require('path');
const mkdirp = require('mkdirp');

const BUILD_PATH = path.join(__dirname, '..', 'build');

const setup = () => {
  mkdirp.sync(BUILD_PATH);
};

module.exports = setup;
