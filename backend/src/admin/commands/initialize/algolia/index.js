import * as R from 'ramda';
import algolia, { APP_ID } from 'lib/algoliaClient';
import createIndex from './createIndex';
import importData from './import';

export const canInitialize = async () => {
  const indexes = await algolia.listIndexes();
  const isEmpty = R.propSatisfies(R.isEmpty, 'items', indexes);

  if (!isEmpty) {
    throw new Error(`Algolia: App with id=${APP_ID} already contains indexes.`);
  }

  return true;
};

export default async () => {
  const createIndexResult = await createIndex();
  const importResult = await importData();

  return [createIndexResult, importResult];
};
