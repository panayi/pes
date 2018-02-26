const fs = require('fs');
const path = require('path');
const R = require('ramda');
const constants = require('../constants');

const ensureDirectoryExists = (filePath) => {
  const dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) {
    return;
  }

  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

const build = () => {
  const backendPackagePath = path.join(constants.paths.backendRoot, 'package.json');
  const webPackagePath = path.join(constants.paths.web, 'package.json');

  const output = R.compose(
    JSON.stringify,
    R.evolve({
      dependencies: R.compose(
        R.assoc('ms', '^2.1.1'),
        R.pickBy((val, key) => !R.test(/^pesposa/, key))
      )
    }),
    R.omit(['devDependencies']),
    ([a, b]) => R.merge(
      a,
      {
        dependencies: R.merge(
          a.dependencies,
          b.dependencies
        )
      }
    ),
    R.map(filename => JSON.parse(fs.readFileSync(filename, 'utf8'))),
  )([backendPackagePath, webPackagePath])

  const outputFilePath = path.join(constants.paths.build, constants.folders.functions, 'package.json');
  ensureDirectoryExists(outputFilePath);
  fs.writeFileSync(outputFilePath, output);
}

module.exports = build;