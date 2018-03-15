import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from '@pesposa/core/src/config/firebaseClient';
import seed from './seed';
import importLegacyAds from './importLegacyAds';

export const canInitialize = async () => {
  const ref = database.ref();
  const snapshot = await ref.once('value');

  if (!snapshot || !R.is(Function, snapshot.val)) {
    throw new Error('Firebase: Error getting value of database');
  }

  const value = snapshot.val();
  const noData = isNilOrEmpty(value);

  if (!noData) {
    throw new Error('Firebase: Database is not empty.');
  }

  return true;
};

const initializeFirebase = async options => {
  const seedResult = await seed(options);
  const importResult = await importLegacyAds(options);

  return [seedResult, importResult];
};

export default initializeFirebase;
