import * as R from 'ramda';
import env from '@pesposa/core/src/config/env';
import { client as algoliaClient } from '@pesposa/server-core/src/services/algolia';

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

export default canInitialize;
