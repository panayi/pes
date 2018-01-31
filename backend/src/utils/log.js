import * as R from 'ramda';
import chalk from 'chalk';

const isFirebaseFunctionsEnv = process.env.IS_FIREBASE_FUNCTIONS;

const typeToColor = {
  info: 'cyan',
  success: 'green',
  error: 'red',
  warn: 'yellow',
};

const log = R.curry((type, message) => {
  if (isFirebaseFunctionsEnv) {
    // There's no console.success
    const finalType = type === 'success' ? 'info' : type;
    return console[finalType](message);
  }

  const color = typeToColor[type];
  return console.log(`${chalk[color](type)}: ${message}`);
});

const info = log('info');
const success = log('success');
const error = log('error');
const warn = log('warn');

export default {
  info,
  success,
  error,
  warn,
};
