import { isNilOrEmpty } from 'ramda-adjunct';
import * as functions from 'firebase-functions';
import client from '@pesposa/core/src/client';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import server from '@pesposa/server-core/src/server';

const handleExternalUserPhoneWritten = async (change, context) => {
  const phone = change.after.val();
  if (isNilOrEmpty(phone)) {
    return;
  }

  const { id } = context.params;
  const hasUser = await client.externalUsers.hasUser(firebase, id);
  if (hasUser) {
    return;
  }

  const userSnap = await server.users.findByPhone(firebase, phone);
  if (userSnap) {
    server.externalUsers.migrate(firebase, id, userSnap.key);
  }
};

const externalUserPhoneWritten = functions.database
  .ref('/externalUsers/{id}/phone')
  .onWrite(handleExternalUserPhoneWritten);

export default externalUserPhoneWritten;
