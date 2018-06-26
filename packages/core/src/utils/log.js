import * as R from 'ramda';
import chalk from 'chalk';
import env from '../config/env';

const typeToColor = {
  info: 'cyan',
  success: 'green',
  error: 'red',
  warn: 'yellow',
};

const logger = R.curry((type, message) => {
  if (env.isApplicationApp) {
    // There's no console.success
    const finalType = type === 'success' ? 'info' : type;
    return console[finalType](message); // eslint-disable-line no-console
  }

  const color = typeToColor[type];
  return console.log(`${chalk[color](type)}: ${message}`); // eslint-disable-line no-console
});

const info = logger('info');
const success = logger('success');
const error = logger('error');
const warn = logger('warn');

const log = {
  info,
  success,
  error,
  warn,
};

export default log;
