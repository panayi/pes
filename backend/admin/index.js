import * as R from 'ramda';
import yargs from 'yargs';
import chalk from 'chalk';
import log from 'helpers/log';
import initialize from './initialize';

const COMMANDS = {
  initialize,
};

const commandKey = R.compose(
  R.prop('c'),
  R.propOr({}, 'argv'),
)(yargs);

const command = R.prop(commandKey, COMMANDS);

if (R.isNil(command)) {
  log.error(`Missing command: ${chalk.yellow(`[${commandKey}]`)}`);
  process.exit();
}

const caller = async () => {
  try {
    await command();
  } catch (error) {
    log.error(error);
  }

  process.exit();
};

caller();
