import R from 'ramda';
import { database } from '../../lib/firebase';
import algolia from '../../lib/algolia';

const serializePost = R.compose(
  R.over(
    R.lensProp('body'),
    R.compose(
      str => str.substring(0, 1500),
      R.defaultTo(''),
    ),
  ),
  R.over(
    R.lensProp('images')
    R.compose(
      R.pluck('downloadURL'),
      R.defaultTo([]),
    ),
  ),
  R.pick(['title', 'body', 'category', 'categoryChild', 'price', 'images']),
);

const initialImport = (dataSnapshot, req, res) => {
  const index = algolia.initIndex('posts');

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
  index.saveObjects(objectsToIndex, (err, content) => {
    if (err) {
      throw err;
    }

    console.log('Firebase -> Algolia import done');
    res.send('Done');
  });
};

export default (req, res) => {
  const postsRef = database.ref('/posts');
  postsRef.once('value', (dataSnapshot) => initialImport(dataSnapshot, req, res));
};
