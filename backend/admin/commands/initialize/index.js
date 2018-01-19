import * as R from 'ramda';
import log from 'utils/log';
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

const initialize = async service => {
  log.info('Starting initialization script');
  await canInitialize(service);

  if (shouldInitializeAlgolia(service)) {
    const algoliaResult = await initializeAlgolia();
    log.success('Algolia: Initialized');
    R.forEach(msg => log.info(`Algolia: ${msg}`), algoliaResult);
  }

  if (shouldInitializeFirebase(service)) {
    const firebaseResult = await initializeFirebase();
    log.success('Firebase: Initialized');
    R.forEach(msg => log.info(`Firebase: ${msg}`), firebaseResult);
  }
};

export default program =>
  program
    .command('initialize [service]')
    .description('Initialize [service] or all services')
    .action(async service => {
      try {
        await initialize(service);
        process.exit();
      } catch (error) {
        log.error(error.message);
        process.exit();
      }
    });
