import * as R from 'ramda';
import chalk from 'chalk';

const typeToColor = {
  info: 'cyan',
  success: 'green',
  error: 'red',
};

const log = R.curry((type, message) => {
  const color = typeToColor[type];
  return console.log(`${chalk[color](type)}: ${message}`);
});

const info = log('info');
const success = log('success');
const error = log('error');

export default {
  info,
  success,
  error,
};
