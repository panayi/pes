import * as R from 'ramda';
import * as functions from 'firebase-functions';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import * as algoliaService from '@pesposa/server-core/src/services/algolia';
import server from '@pesposa/server-core/src/server';

const handleAdDeleted = async (snap, context) => {
  const id = R.path(['params', 'id'], context);

  // Remove ad from algolia
  await algoliaService.remove(id);

  return server.reviewAdTasks.remove(firebase, id);
};

const adDeleted = functions.database.ref('/ads/{id}').onDelete(handleAdDeleted);

export default adDeleted;
