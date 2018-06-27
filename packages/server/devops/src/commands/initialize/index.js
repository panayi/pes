import logger from 'winston-color';
import { seed } from '../seed';
import { importTestData } from '../importTestData';
import createAlgoliaIndexes from './createAlgoliaIndexes';
import canInitializeFirebase from './canInitializeFirebase';
import canInitializeAlgolia from './canInitializeAlgolia';

const canInitialize = async () => {
  logger.info('Checking ability to initialize');

  await canInitializeFirebase();
  logger.info('Firebase: OK');

  await canInitializeAlgolia();
  logger.info('Algolia: OK');
};

const initialize = async options => {
  logger.info('Starting initialization script');

  if (options.force) {
    logger.info('Forced initialization');
  } else {
    await canInitialize();
  }

  await createAlgoliaIndexes();
  await seed();
  await importTestData(options);
};

const action = async options => {
  try {
    await initialize(options);
  } catch (error) {
    logger.error(error.message);
  }
  process.exit();
};

const command = program =>
  program
    .command('initialize')
    .option('-n, --numberOfAds <n>', 'How many ads to import. Defaults to 20')
    .option(
      '-f, --force',
      'Force initialization. WARNING !!! This can potentially overwrite data',
    )
    .description('Runs `seed` and then `importLegacyAds`')
    .action(action);

export default command;
