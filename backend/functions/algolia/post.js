import * as functions from 'firebase-functions';
import algolia from 'algoliaClient';
import serializePost from 'helpers/serializePostToAlgolia';

const addOrUpdateIndexRecord = event => {
  const index = algolia.initIndex('posts');

  // Get Firebase object
  const firebaseObject = event.data.val();

  // Specify Algolia's objectID using the Firebase object key
  firebaseObject.objectID = event.params.postId;

  // Add or update object
  index.saveObject(serializePost(firebaseObject), err => {
    if (err) {
      throw err;
    }

    console.log('Firebase object indexed in Algolia', firebaseObject.objectID);
  });
};

const deleteIndexRecord = event => {
  const index = algolia.initIndex('posts');

  // Get Algolia's objectID from the Firebase object key
  const objectID = event.params.postId;

  // Remove the object from Algolia
  index.deleteObject(objectID, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Firebase object deleted from Algolia', objectID);
    }
  });
};

export default functions.database.ref('/posts/{postId}').onWrite(event => {
  if (!event.data.exists()) {
    deleteIndexRecord(event);
  } else {
    addOrUpdateIndexRecord(event);
  }
});
