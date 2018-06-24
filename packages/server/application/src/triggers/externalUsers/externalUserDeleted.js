import * as R from 'ramda';
import * as functions from 'firebase-functions';
import server from '@pesposa/server-core/src/server';
import firebase from '@pesposa/server-core/src/config/firebaseClient';

const handleExternalUserDeleted = async (snap, context) => {
  const id = R.path(['params', 'id'], context);

  return server.externalUsers.externalUserWasDeleted(firebase, id);
};

const externalUserDeleted = functions.database
  .ref('/externalUsers/{id}')
  .onDelete(handleExternalUserDeleted);

export default externalUserDeleted;
