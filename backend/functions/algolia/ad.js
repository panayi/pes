import * as functions from 'firebase-functions';
import algolia from 'algoliaClient';
import serializeAd from 'helpers/serializeAdToAlgolia';

const adsIndexName = process.env.REACT_APP_ALGOLIA_ADS_INDEX_NAME;

const addOrUpdateIndexRecord = event => {
  const index = algolia.initIndex(adsIndexName);

  // Get Firebase object
  const firebaseObject = event.data.val();

  // Specify Algolia's objectID using the Firebase object key
  firebaseObject.objectID = event.params.adId;

  // Add or update object
  index.saveObject(serializeAd(firebaseObject), err => {
    if (err) {
      throw err;
    }

    console.log('Firebase object indexed in Algolia', firebaseObject.objectID);
  });
};

const deleteIndexRecord = event => {
  const index = algolia.initIndex(adsIndexName);

  // Get Algolia's objectID from the Firebase object key
  const objectID = event.params.adId;

  // Remove the object from Algolia
  index.deleteObject(objectID, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Firebase object deleted from Algolia', objectID);
    }
  });
};

export default functions.database.ref('/ads/{adId}').onWrite(event => {
  if (!event.data.exists()) {
    deleteIndexRecord(event);
  } else {
    addOrUpdateIndexRecord(event);
  }
});
