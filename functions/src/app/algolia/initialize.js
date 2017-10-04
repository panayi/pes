/* eslint-disable no-console */
import { database } from '../../lib/firebase';
import algolia from '../../lib/algolia';
import serializePost from '../../lib/helpers/serializePostToAlgolia';

const initialImport = (dataSnapshot, index, req, res) => {
  // Array of data to index
  const objectsToIndex = [];

  // Process each child Firebase object
  dataSnapshot.forEach(((childSnapshot) => {
    // get the key and data from the snapshot
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    // Specify Algolia's objectID using the Firebase object key
    childData.objectID = childKey;

    // Add object for indexing
    objectsToIndex.push(serializePost(childData));
  }));

  // Add or update new objects
  index.saveObjects(objectsToIndex, (err) => {
    if (err) {
      throw err;
    }

    console.log('Firebase -> Algolia import done');
    res.send('Done');
  });
};

export default (req, res) => {
  const index = algolia.initIndex('posts');

  index.clearIndex((err) => {
    if (err) {
      throw err;
    }

    const postsRef = database.ref('/posts');
    postsRef.once('value', dataSnapshot => initialImport(dataSnapshot, index, req, res));
  });
};
