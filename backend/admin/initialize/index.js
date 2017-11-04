import * as R from 'ramda';
import log from 'helpers/log';
import initializeFirebase, { canInitialize as canInitializeFirebase } from './firebase';
import initializeAlgolia, { canInitialize as canInitializeAlgolia } from './algolia';

const shouldInitializeFirebase = R.either(R.isNil, R.propEq('only', 'firebase'));
const shouldInitializeAlgolia = R.either(R.isNil, R.propEq('only', 'algolia'));

const canInitialize = async (options) => {
  log.info('Checking ability to initialize');

  if (shouldInitializeFirebase(options)) {
    await canInitializeFirebase();
    log.success('Firebase: OK');
  }

  if (shouldInitializeAlgolia(options)) {
    await canInitializeAlgolia();
    log.success('Algolia: OK');
  }
};

const initialize = async (options) => {
  log.info('Starting initialization script');
  await canInitialize(options);

  if (shouldInitializeFirebase(options)) {
    const firebaseResult = await initializeFirebase();
    log.success('Firebase: Initialized');
    R.forEach(msg => log.info(`Firebase: ${msg}`), firebaseResult);
  }

  if (shouldInitializeAlgolia(options)) {
    const algoliaResult = await initializeAlgolia();
    log.success('Algolia: Initialized');
    R.forEach(msg => log.info(`Algolia: ${msg}`), algoliaResult);
  }
};

export default initialize;
