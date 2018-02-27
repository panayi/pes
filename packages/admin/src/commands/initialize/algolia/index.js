import * as R from 'ramda';
import env from '@pesposa/core/src/config/env';
import { client as algoliaClient } from '@pesposa/core/src/services/algolia';
import createIndex from './createIndex';
import initialImport from './import';

export const canInitialize = async () => {
  const indexes = await algoliaClient.listIndexes();
  const isEmpty = R.propSatisfies(R.isEmpty, 'items', indexes);

  if (!isEmpty) {
    throw new Error(
      `Algolia: App with id=${env.algoliaAppId} already contains indexes.`,
    );
  }

  return true;
};

const initializeAlgolia = async () => {
  const createIndexResult = await createIndex();
  const importResult = await initialImport();

  return [createIndexResult, importResult];
};

export default initializeAlgolia;