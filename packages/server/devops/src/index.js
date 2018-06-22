import * as R from 'ramda';
import program from 'commander';
import readlineSync from 'readline-sync';
import logger from 'winston-color';
import chalk from 'chalk';
import validateDeployment from './utils/validateDeployment';
import * as commands from './commands';

const COMMAND_ARGS_LENGTH = 2;

program
  .name('yarn devops')
  .option(
    '-p, --production',
    'Run on production deployment (pesposa-production)',
  )
  .command('help', '')
  .description('Usage information')
  .action(() => program.help());

R.forEach(command => command(program), R.values(commands));
program.parse(process.argv);

const requestedProductionDeployment = program.production;

if (!validateDeployment(requestedProductionDeployment)) {
  process.exit();
}

if (requestedProductionDeployment) {
  logger.warn('WARNING! This command will run on production project.');
  const projectName = readlineSync.question(
    'Enter the project name to continue: ',
  );

  if (projectName !== 'pesposa-production') {
    logger.error('Production project name is not correct. Exiting...');
    process.exit(1);
  }
}

logger.info(
  `Running on ${
    requestedProductionDeployment
      ? chalk.yellowBright.inverse('production')
      : chalk.blue('development')
  } deployment`,
);

const commandNames = R.keys(commands);
const command = R.compose(
  R.head,
  R.defaultTo([]),
)(process.argv.slice(COMMAND_ARGS_LENGTH));

if (!command || !R.contains(command, commandNames)) {
  logger.error(`Command "${command || ''}" not found.`);
  program.outputHelp();
  process.exit();
}
