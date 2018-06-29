import * as R from 'ramda';
import * as functions from 'firebase-functions';
import * as externalUserEngagementChannels from '@pesposa/core/src/config/externalUserEngagementChannels';
import client from '@pesposa/core/src/client';
import server from '@pesposa/server-core/src/server';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import sendExternalUserEngagementEmail from '../../emails/externalUserEngagement';

const handleSendEmail = async (data, context) => {
  const { externalUserId, adId } = data;
  const admin = R.path(['auth', 'token', 'admin'], context);

  if (!admin) {
    throw new functions.https.HttpsError('permission-denied', 'Unauthorized');
  }

  if (!externalUserId || !adId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing externalUserId or adId',
    );
  }

  const externalUserSnap = await client.externalUsers.get(
    firebase,
    externalUserId,
  );
  const adSnap = await client.ads.get(firebase, adId);

  if (!externalUserSnap.exists() || !adSnap.exists()) {
    throw new functions.https.HttpsError(
      'not-found',
      'ExternalUser or Ad not found',
    );
  }

  const { email } = externalUserSnap.val();
  const ad = adSnap.val();

  if (!email) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'ExternalUser has no email',
    );
  }

  const externalUserCode = await server.externalUserCodes.getCodeForExternalUser(
    firebase,
    externalUserId,
  );

  if (!externalUserCode) {
    throw new functions.https.HttpsError(
      'not-found',
      'code for ExternalUser not found',
    );
  }

  const content = await sendExternalUserEngagementEmail({
    email,
    ad,
    externalUserCode,
    adId,
  });
  const channel = externalUserEngagementChannels.EMAIL;

  return client.convertExternalUserTasks.createEngagement(
    firebase,
    externalUserId,
    { channel, content },
  );
};

const sendEmailToExternalUser = functions.https.onCall(handleSendEmail);

export default sendEmailToExternalUser;
