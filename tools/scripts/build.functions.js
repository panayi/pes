const fs = require('fs');
const path = require('path');
const R = require('ramda');
const constants = require('../constants');

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

  const output = R.compose(
    JSON.stringify,
    R.evolve({
      dependencies: R.compose(
        R.assoc('ms', '^2.1.1'),
        R.assoc('isarray', '^1.0.0'),
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

  const outputFilePath = path.join(
    constants.paths.build,
    constants.folders.functions,
    'package.json',
  );
  ensureDirectoryExists(outputFilePath);
  fs.writeFileSync(outputFilePath, output);
};

module.exports = build;
