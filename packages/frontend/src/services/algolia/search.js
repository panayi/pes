import client from './client';

const indexes = {};

const search = async (indexName, params) => {
  try {
    let index = indexes[indexName];

    if (!index) {
      index = client.initIndex(indexName);
      indexes[indexName] = index;
    }

    const result = await index.search(params);
    return result;
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    throw error;
  }
};

export default search;
