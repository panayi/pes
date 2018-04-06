import * as functions from 'firebase-functions';
import server from '@pesposa/server-core/src/server';
import firebase from '@pesposa/server-core/src/config/firebaseClient';

const handleMigrateToUser = async (data, context) => {
  const { code } = data;
  const userId = context.auth.uid;
  const externalUserCodeSnap = await server.externalUserCodes.get(
    firebase,
    code,
  );
  if (!externalUserCodeSnap.exists()) {
    throw new functions.https.HttpsError(
      'not-found',
      '/externalUserCodes[code] does not exist',
    );
  }
  const externalUserId = externalUserCodeSnap.val();
  await server.externalUsers.migrate(firebase, externalUserId, userId);
  return null;
};

const migrateToUser = functions.https.onCall(handleMigrateToUser);

export default migrateToUser;
