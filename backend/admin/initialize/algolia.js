import * as R from 'ramda';
import algolia from 'algoliaClient';
import serializePost from 'helpers/serializePostToAlgolia';
import { database } from '../lib/firebaseClient';

export const canInitialize = async () => {
  const indexes = await algolia.listIndexes();

  const isEmpty = R.compose(
    R.isEmpty,
    R.prop('items'),
    R.defaultTo({}),
  )(indexes);

  if (!isEmpty) {
    throw new Error('Algolia: App already contains indexes.');
  }

  return true;
};

const initialImportPosts = async (dataSnapshot, index) => {
  // Array of data to index
  const objectsToIndex = [];

  // Process each child Firebase object
  dataSnapshot.forEach(((childSnapshot) => {
    // Get the key and data from the snapshot
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();

    // Specify Algolia's objectID using the Firebase object key
    childData.objectID = childKey;

    // Add object for indexing
    objectsToIndex.push(serializePost(childData));
  }));

  // Add or update new objects
  await index.saveObjects(objectsToIndex);

  return objectsToIndex;
};

export default async () => {
  try {
    const index = algolia.initIndex('posts');
    await index.clearIndex();

    const dataSnapshot = await database.ref('/posts').once('value');
    const posts = await initialImportPosts(dataSnapshot, index);

    return {
      posts: posts.length,
    };
  } catch (error) {
    return error;
  }
};
