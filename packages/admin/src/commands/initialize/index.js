import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import initializeFirebase, {
  canInitialize as canInitializeFirebase,
} from './firebase';
import initializeAlgolia, {
  canInitialize as canInitializeAlgolia,
} from './algolia';

const shouldInitializeService = name => R.either(R.isNil, R.equals(name));

const shouldInitializeFirebase = shouldInitializeService('firebase');
const shouldInitializeAlgolia = shouldInitializeService('algolia');

const canInitialize = async service => {
  log.info('Checking ability to initialize');

  if (shouldInitializeFirebase(service)) {
    await canInitializeFirebase();
    log.success('Firebase: OK');
  }

  if (shouldInitializeAlgolia(service)) {
    await canInitializeAlgolia();
    log.success('Algolia: OK');
  }
};

const initialize = async (service, options) => {
  log.info('Starting initialization script');
  await canInitialize(service);

  if (shouldInitializeFirebase(service)) {
    const firebaseResult = await initializeFirebase(options);
    log.success('Firebase: Initialized');
    R.forEach(msg => log.info(`Firebase: ${msg}`), firebaseResult);
  }

  if (shouldInitializeAlgolia(service)) {
    const algoliaResult = await initializeAlgolia(options);
    log.success('Algolia: Initialized');
    R.forEach(msg => log.info(`Algolia: ${msg}`), algoliaResult);
  }
};

const action = async (service, options) => {
  try {
    await initialize(service, options);
    process.exit();
  } catch (error) {
    log.error(error.message);
    process.exit();
  }
};

const command = program =>
  program
    .command('initialize [service]')
    .option('-i, --import <n>', 'How many legacy ads to import')
    .description('Initialize [service] or all services')
    .action(action);

export default command;
