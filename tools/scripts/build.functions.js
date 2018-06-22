/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const R = require('ramda');
const webpack = require('webpack');
const logger = require('winston-color');
const constants = require('../constants');
const createConfig = require('../config/webpack.functions');
const ensureDirectoryExists = require('../utils/ensureDirectoryExists');

const build = entries => {
  // Create package.json
  const applicationPackagePath = path.join(
    constants.paths.application,
    'package.json',
  );
  const webPackagePath = path.join(constants.paths.web, 'package.json');
  const corePackagePath = path.join(constants.paths.core, 'package.json');
  const serverCorePackagePath = path.join(
    constants.paths.serverCore,
    'package.json',
  );
  const outputPath = path.join(
    constants.paths.build,
    constants.folders.functions,
  );
  const output = R.compose(
    JSON.stringify,
    R.evolve({
      dependencies: R.compose(
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
  )([
    applicationPackagePath,
    webPackagePath,
    serverCorePackagePath,
    corePackagePath,
  ]);
  const targetPackageFile = path.join(outputPath, 'package.json');
  ensureDirectoryExists(targetPackageFile);
  fs.writeFileSync(targetPackageFile, output);

  // Copy server.bundle.js (for "app" function)
  const sourceServerFile = path.join(
    constants.paths.build,
    'web',
    'server',
    'server.bundle.js',
  );
  const targetServerFile = path.join(outputPath, 'server.bundle.js');
  ensureDirectoryExists(targetServerFile);
  fs.writeFileSync(targetServerFile, fs.readFileSync(sourceServerFile));

  // Copy app.js
  const sourceAppFile = path.join(
    __dirname,
    '..',
    'templates',
    'functions.app.js.template',
  );
  const targetAppFile = path.join(outputPath, 'app.js');
  ensureDirectoryExists(targetAppFile);
  fs.writeFileSync(targetAppFile, fs.readFileSync(sourceAppFile));

  // Write index.js file
  const targetIndexFile = path.join(outputPath, 'index.js');
  fs.writeFileSync(targetIndexFile, '');
  const indexStream = fs.createWriteStream(targetIndexFile, {
    flags: 'a', // 'a' means appending (old data will be preserved)
  });
  R.compose(
    R.forEach(name =>
      indexStream.write(`exports.${name} = require('./${name}.js').default;\n`),
    ),
    R.append('app'),
    R.keys,
  )(entries);
  indexStream.end();

  const config = createConfig(entries);
  const compiler = webpack(config);

  compiler.run(err => {
    if (err) {
      logger.error(err);
    }
  });
};

const getFunctionsFiles = callback => {
  const triggersDir = path.join(constants.paths.application, 'src', 'triggers');
  glob(`${triggersDir}/**/*.js`, (err, files) => {
    const fileObjects = files.map(file => ({
      name: file
        .split('/')
        .pop()
        .split('.')
        .shift(),
      path: file,
    }));
    fileObjects.push({
      name: 'api',
      path: path.join(constants.paths.application, 'src', 'api', 'index.js'),
    });
    const entries = fileObjects.reduce((acc, item) => {
      acc[item.name] = item.path;
      return acc;
    }, {});
    callback(entries);
  });
};

// Run
getFunctionsFiles(build);
