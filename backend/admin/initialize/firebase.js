import * as R from 'ramda';
import categories from 'seeds/categories.json';
import { database } from '../lib/firebaseClient';

export const canInitialize = async () => {
  const ref = database.ref();
  const snapshot = await ref.once('value');

  if (!snapshot || !R.is(Function, snapshot.val)) {
    throw new Error('Firebase: Error getting value of database');
  }

  const isEmpty = R.isEmpty(snapshot.val());

  if (!isEmpty) {
    throw new Error('Firebase: Database is not empty.');
  }

  return true;
};

const seedCategories = async () => {
  await database.ref('categories').set(categories);

  return ['categories'];
};

export default async () => {
  try {
    await seedCategories();
    return null;
  } catch (error) {
    return error;
  }
};
