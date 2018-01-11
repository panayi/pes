import * as R from 'ramda';
import algolia from 'algoliaClient';
import serializeAd from 'helpers/serializeAdToAlgolia';
import { database } from '../../../lib/firebaseClient';
import { ADS_INDEXES } from '../../../../../src/config/algolia';

export const canInitialize = async () => {
  const indexes = await algolia.listIndexes();

  const isEmpty = R.compose(R.isEmpty, R.prop('items'), R.defaultTo({}))(
    indexes,
  );

  if (!isEmpty) {
    throw new Error('Algolia: App already contains indexes.');
  }

  return true;
};

const initialImportAds = async (dataSnapshot, index) => {
  // Array of data to index
  const objectsToIndex = [];

  // Process each child Firebase object
  dataSnapshot.forEach(childSnapshot => {
    // Get the key and data from the snapshot
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();

    // Specify Algolia's objectID using the Firebase object key
    childData.objectID = childKey;

    // Add object for indexing
    objectsToIndex.push(serializeAd(childData));
  });

  // Add or update new objects
  await index.saveObjects(objectsToIndex);

  return objectsToIndex;
};

export default async () => {
  const index = algolia.initIndex(ADS_INDEXES.default);

  const dataSnapshot = await database.ref('/ads').once('value');
  const ads = await initialImportAds(dataSnapshot, index);

  return [`Imported ${ads.length} ads`];
};
