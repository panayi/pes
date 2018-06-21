import { isNilOrEmpty } from 'ramda-adjunct';
import * as functions from 'firebase-functions';
import client from '@pesposa/core/src/client';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import server from '@pesposa/server-core/src/server';

const handleUserPhoneWritten = async (change, context) => {
  const phone = change.after.val();
  if (isNilOrEmpty(phone)) {
    return;
  }

  const externalUserSnap = await client.externalUsers.findByPhone(
    firebase,
    phone,
  );
  if (externalUserSnap) {
    const { id: userId } = context.params;
    await server.externalUsers.migrate(firebase, externalUserSnap.key, userId);
  }
};

const userPhoneWritten = functions.database
  .ref('/users/{id}/phone')
  .onWrite(handleUserPhoneWritten);

export default userPhoneWritten;
