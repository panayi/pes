/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const cmd = require('node-cmd');
const webpack = require('webpack');
const chalk = require('chalk');
const logger = require('winston-color');
const program = require('commander');
const ensureDirectoryExists = require('../utils/ensureDirectoryExists');
const createConfig = require('../config/webpack.devops');

const SECRETS_PATH = path.join('/', 'tmp', 'pesposa', '.secrets');

const OUTPUT_PATH = path.join(__dirname, '..', '..', 'build', 'devops');

const build = (paths, callback) => {
  const config = createConfig(paths);
  const compiler = webpack(config);
  compiler.run(err => {
    if (err) {
      logger.error(err);
    }

    if (callback) {
      callback();
    }

    process.exit();
  });
};

const setupProductionEnv = () => {
  const sourceEnvPath = path.join(SECRETS_PATH, `.env.production`);
  const sourceServiceAccountKeyPath = path.join(
    SECRETS_PATH,
    'serviceAccountKeys',
    'production.json',
  );
  const paths = {
    env: sourceEnvPath,
    serviceAccountKey: sourceServiceAccountKeyPath,
  };

  build(paths);
};

// Run
program
  .option(
    '-p, --production',
    'Build devops for production deployment (pesposa-production)',
  )
  .parse(process.argv);

ensureDirectoryExists(OUTPUT_PATH);
const requestedProductionDeployment = program.production;

if (requestedProductionDeployment) {
  logger.info(
    `Building devops for ${chalk.yellowBright.inverse(
      'production',
    )} deployment`,
  );
  cmd.get(
    `git clone git@bitbucket.org:pesposa/secrets.git ${SECRETS_PATH} || (cd ${SECRETS_PATH} && git pull && cd -)`,
    setupProductionEnv,
  );
} else {
  logger.info(`Building devops for ${chalk.blue('development')} deployment`);
  build();
}
