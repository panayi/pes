import * as R from 'ramda';
import algolia, { appId } from 'lib/algoliaClient';
import createIndex from './createIndex';
import importData from './import';

export const canInitialize = async () => {
  const indexes = await algolia.listIndexes();

  const isEmpty = R.compose(R.isEmpty, R.prop('items'), R.defaultTo({}))(
    indexes,
  );

  if (!isEmpty) {
    throw new Error(`Algolia: App with id=${appId} already contains indexes.`);
  }

  return true;
};

export default async () => {
  const createIndexResult = await createIndex();
  const importResult = await importData();

  return [createIndexResult, importResult];
};
