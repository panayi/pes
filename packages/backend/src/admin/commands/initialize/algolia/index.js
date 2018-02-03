import * as R from 'ramda';
import { env } from 'pesposa-config';
import algolia from 'lib/algoliaClient';
import createIndex from './createIndex';
import importData from './import';

export const canInitialize = async () => {
  const indexes = await algolia.listIndexes();
  const isEmpty = R.propSatisfies(R.isEmpty, 'items', indexes);

  if (!isEmpty) {
    throw new Error(
      `Algolia: App with id=${
        env.REACT_APP_ALGOLIA_APP_ID
      } already contains indexes.`,
    );
  }

  return true;
};

const initializeAlgolia = async () => {
  const createIndexResult = await createIndex();
  const importResult = await importData();

  return [createIndexResult, importResult];
};

export default initializeAlgolia;
