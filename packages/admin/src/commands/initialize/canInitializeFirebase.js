import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from '@pesposa/core/src/config/firebaseClient';

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

export default canInitialize;
