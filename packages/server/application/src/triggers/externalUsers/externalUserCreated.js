import * as functions from 'firebase-functions';
import server from '@pesposa/server-core/src/server';
import firebase from '@pesposa/server-core/src/config/firebaseClient';

const handleExternalUserCreated = async (snap, context) => {
  const { id } = context.params;
  return server.externalUserCodes.create(firebase, id);
};

const externalUserCreated = functions.database
  .ref('/externalUsers/{id}')
  .onCreate(handleExternalUserCreated);

export default externalUserCreated;
