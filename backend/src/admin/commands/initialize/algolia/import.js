import algolia from 'lib/algoliaClient';
import log from 'utils/log';
import { ADS_INDEXES } from 'frontend/config/algolia';
import { database } from 'lib/firebaseClient';
import serializeAd from 'utils/serializeAdToAlgolia';

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
  try {
    const index = algolia.initIndex(ADS_INDEXES.default);
    const dataSnapshot = await database.ref('/ads').once('value');
    const ads = await initialImportAds(dataSnapshot, index);
    return [`Imported ${ads.length} ads`];
  } catch (error) {
    log.error('Algolia: initial ads import failed');
    throw error;
  }
};
