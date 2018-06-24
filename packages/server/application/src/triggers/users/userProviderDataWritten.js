import * as R from 'ramda';
import * as functions from 'firebase-functions';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import server from '@pesposa/server-core/src/server';

const handleUserProviderDataWritten = async (change, context) => {
  // Only handle create and update
  if (!change.after.exists()) {
    return null;
  }

  const id = R.path(['params', 'id'], context);
  const userSnap = await server.users.get(firebase, id);

  // Download avatar for use on user profile
  return server.avatars.download(firebase, userSnap, id);
};

const userProviderDataWritten = functions.database
  .ref('/users/{id}/providerData')
  .onWrite(handleUserProviderDataWritten);

export default userProviderDataWritten;
