/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const logger = require('winston-color');
const constants = require('../constants');
const config = require('../config/webpack.functions');

const ensureDirectoryExists = filePath => {
  const dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) {
    return;
  }

  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
};

const build = () => {
  const applicationPackagePath = path.join(
    constants.paths.application,
    'package.json',
  );
  const rootPackagePath = path.join(constants.paths.root, 'package.json');
  const webPackagePath = path.join(constants.paths.web, 'package.json');
  const corePackagePath = path.join(constants.paths.core, 'package.json');
  const outputPath = path.join(
    constants.paths.build,
    constants.folders.functions,
  );

  const output = R.compose(
    JSON.stringify,
    R.evolve({
      dependencies: R.compose(
        R.assoc('ms', '^2.1.1'),
        R.assoc('isarray', '^1.0.0'),
        R.assoc('faye-websocket', '^0.11.1'),
        R.assoc('babel-runtime', '^6.26.0'),
        R.pickBy((val, key) => !R.test(/^@pesposa/, key)),
      ),
    }),
    R.omit(['devDependencies']),
    ([a, b, c, d]) =>
      R.merge(a, {
        dependencies: R.mergeAll([
          a.dependencies,
          b.dependencies,
          c.dependencies,
          d.dependencies,
        ]),
      }),
    R.map(filename => JSON.parse(fs.readFileSync(filename, 'utf8'))),
  )([applicationPackagePath, rootPackagePath, webPackagePath, corePackagePath]);

  const outputFilePath = path.join(outputPath, 'package.json');

  const compiler = webpack(config);

  ensureDirectoryExists(outputFilePath);
  fs.writeFileSync(outputFilePath, output);

  compiler.run(err => {
    if (err) {
      logger.error(err);
    }
  });
};

build();
