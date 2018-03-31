import log from '@pesposa/core/src/utils/log';
import { seed } from '../seed';
import { importLegacyAds } from '../importLegacyAds';
import createAlgoliaIndexes from './createAlgoliaIndexes';
import canInitializeFirebase from './canInitializeFirebase';
import canInitializeAlgolia from './canInitializeAlgolia';

const canInitialize = async () => {
  log.info('Checking ability to initialize');

  await canInitializeFirebase();
  log.success('Firebase: OK');

  await canInitializeAlgolia();
  log.success('Algolia: OK');
};

const initialize = async options => {
  log.info('Starting initialization script');

  if (options.force) {
    log.info('Forced initialization');
  } else {
    await canInitialize();
  }

  await createAlgoliaIndexes();
  await seed();
  await importLegacyAds(options);
};

const action = async options => {
  try {
    await initialize(options);
  } catch (error) {
    log.error(error.message);
  }
  process.exit();
};

const command = program =>
  program
    .command('initialize')
    .option('-i, --import <n>', 'How many legacy ads to import')
    .option(
      '-f, --force',
      'Force initialization. WARNING !!! This can potentially overwrite data',
    )
    .description('Runs `seed` and then `importLegacyAds`')
    .action(action);

export default command;
