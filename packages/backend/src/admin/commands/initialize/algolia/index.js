import * as R from 'ramda';
import { env } from 'pesposa-config';
import algolia from 'lib/algoliaClient';
import createIndex from './createIndex';
import initialImport from './import';

export const canInitialize = async () => {
  const indexes = await algolia.listIndexes();
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
