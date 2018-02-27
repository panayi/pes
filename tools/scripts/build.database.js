/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const cmd = require('node-cmd');
const logger = require('winston-color');
const ensureDirectoryExists = require('../utils/ensureDirectoryExists');

const INPUT_PATH = path.join(
  __dirname,
  '..',
  '..',
  'packages',
  'core',
  'src',
  'database',
  'rules.bolt',
);
const OUTPUT_PATH = path.join(
  __dirname,
  '..',
  '..',
  'build',
  'database',
  'rules.json',
);

ensureDirectoryExists(OUTPUT_PATH);

const callback = (err, data) => {
  if (!err) {
    logger.info(data || 'Build database completed');
  } else {
    logger.error(err);
  }
};

cmd.get(`firebase-bolt ${INPUT_PATH} --output ${OUTPUT_PATH}`, callback);
