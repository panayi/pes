import { isNilOrEmpty } from 'ramda-adjunct';
import * as functions from 'firebase-functions';
import client from '@pesposa/core/src/client';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import server from '@pesposa/server-core/src/server';

const handleUserEmailWritten = async (change, context) => {
  const email = change.after.val();
  if (isNilOrEmpty(email)) {
    return;
  }

  const externalUserSnap = await client.externalUsers.findByEmail(
    firebase,
    email,
  );
  if (externalUserSnap) {
    const { id: userId } = context.params;
    await server.externalUsers.migrate(firebase, externalUserSnap.key, userId);
  }
};

const userEmailWritten = functions.database
  .ref('/users/{id}/email')
  .onWrite(handleUserEmailWritten);

export default userEmailWritten;
