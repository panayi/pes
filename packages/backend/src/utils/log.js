import * as R from 'ramda';
import chalk from 'chalk';

const isFirebaseFunctionsEnv = process.env.IS_FIREBASE_FUNCTIONS_ENV;

const typeToColor = {
  info: 'cyan',
  success: 'green',
  error: 'red',
  warn: 'yellow',
};

const logger = R.curry((type, message) => {
  if (isFirebaseFunctionsEnv) {
    // There's no console.success
    const finalType = type === 'success' ? 'info' : type;
    return console[finalType](message);
  }

  const color = typeToColor[type];
  return console.log(`${chalk[color](type)}: ${message}`);
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
