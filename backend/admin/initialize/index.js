import * as R from 'ramda';
import log from 'helpers/log';
import initializeFirebase, { canInitialize as canInitializeFirebase } from './firebase';
import initializeAlgolia, { canInitialize as canInitializeAlgolia } from './algolia';

const canInitialize = async () => {
  log.info('Checking ability to initialize');

  await canInitializeFirebase();
  log.success('Firebase: OK');

  await canInitializeAlgolia();
  log.success('Algolia: OK');
};

const initialize = async () => {
  log.info('Starting initialization script');
  await canInitialize();

  const firebaseResult = await initializeFirebase();
  log.success('Firebase: Initialized');
  R.forEach(msg => log.info(`Firebase: ${msg}`), firebaseResult);

  const algoliaResult = await initializeAlgolia();
  log.success('Algolia: Initialized');
  R.forEach(msg => log.info(`Algolia: ${msg}`), algoliaResult);
};

export default initialize;
