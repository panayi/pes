import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import * as functions from 'firebase-functions';
import client from '@pesposa/core/src/client';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import server from '@pesposa/server-core/src/server';

const handleExternalUserEmailWritten = async (change, context) => {
  const email = change.after.val();
  if (isNilOrEmpty(email)) {
    return;
  }

  const id = R.path(['params', 'id'], context);
  const hasUser = await client.externalUsers.hasUser(firebase, id);
  if (hasUser) {
    return;
  }

  const userSnap = await server.users.findByEmail(firebase, email);
  if (userSnap) {
    server.externalUsers.migrate(firebase, id, userSnap.key);
  }
};

const externalUserEmailWritten = functions.database
  .ref('/externalUsers/{id}/email')
  .onWrite(handleExternalUserEmailWritten);

export default externalUserEmailWritten;
