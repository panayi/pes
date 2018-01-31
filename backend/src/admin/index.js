import * as R from 'ramda';
import log from 'utils/log';
import program from 'commander';
import commands from './commands';

const COMMAND_ARGS_LENGTH = 2;

R.forEach(command => command(program), R.values(commands));

program
  .name('yarn admin')
  .command('help', '')
  .description('Usage information')
  .action(() => program.help());

program.parse(process.argv);

const commandNames = R.keys(commands);
const command = R.compose(R.head, R.defaultTo([]))(
  process.argv.slice(COMMAND_ARGS_LENGTH),
);

if (!command || !R.contains(command, commandNames)) {
  log.error(`Command "${command || ''}" not found.`);
  program.outputHelp();
  process.exit();
}
