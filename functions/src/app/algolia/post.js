import functions from 'firebase-functions';
import firebase from '../lib/firebase';
import algolia from './shared/algolia';

// configure algolia
const index = algolia.initIndex('posts');
const postsRef = firebase.ref('/posts');


export default functions.https.onRequest((req, res) => {
  
});


//
// INITIAL IMPORT
//

// function initialImport(dataSnapshot) {
//   // Array of data to index
//   const objectsToIndex = [];
//   // Get all objects
//   const values = dataSnapshot.val();
//
//   // Process each child Firebase object
//   dataSnapshot.forEach(((childSnapshot) => {
//     // get the key and data from the snapshot
//     const childKey = childSnapshot.key;
//     const childData = childSnapshot.val();
//     // Specify Algolia's objectID using the Firebase object key
//     childData.objectID = childKey;
//     // Add object for indexing
//
//     delete childData.body;
//
//     objectsToIndex.push(childData);
//   }));
//
//   // Add or update new objects
//   index.saveObjects(objectsToIndex, (err, content) => {
//     console.log(objectsToIndex);
//     if (err) {
//       throw err;
//     }
//
//     console.log('Firebase -> Algolia import done');
//     process.exit(0);
//   });
// }

// postsRef.once('value', initialImport);

function addOrUpdateIndexRecord(dataSnapshot) {
  // Get Firebase object
  const firebaseObject = dataSnapshot.val();
  // Specify Algolia's objectID using the Firebase object key
  firebaseObject.objectID = dataSnapshot.key;

  firebaseObject.body = firebaseObject.body ? firebaseObject.body.substring(0, 1000) : null;

  // Add or update object
  index.saveObject(firebaseObject, (err, content) => {
    if (err) {
      throw err;
    }
    console.log('Firebase object indexed in Algolia', firebaseObject.objectID);
  });
}

function deleteIndexRecord(dataSnapshot) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = dataSnapshot.key;
  // Remove the object from Algolia
  index.deleteObject(objectID, (err, content) => {
    if (err) {
      throw err;
    }
    console.log('Firebase object deleted from Algolia', objectID);
  });
}

postsRef.on('child_added', addOrUpdateIndexRecord);
postsRef.on('child_changed', addOrUpdateIndexRecord);
postsRef.on('child_removed', deleteIndexRecord);
