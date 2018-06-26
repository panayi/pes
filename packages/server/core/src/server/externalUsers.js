import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import * as adStatuses from '@pesposa/core/src/config/adStatuses';
import client from '@pesposa/core/src/client';
import { nameSelector } from '@pesposa/core/src/selectors/users';
import * as externalUserCodes from './externalUserCodes';

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const findOrCreate = async (firebase, { email, phone }) => {
  const externalUserSnap = await client.externalUsers.find(firebase, {
    email,
    phone,
  });

  if (externalUserSnap) {
    return externalUserSnap;
  }

  // Create a new ExternalUser;
  const finalPhone = phone || null;
  const finalEmail = email || null;
  const name = nameSelector({ phone: finalPhone, email: finalEmail });
  const externalUserId = await client.externalUsers.create(firebase, {
    email: finalEmail,
    profile: {
      name,
      phone: finalPhone,
    },
  });

  return client.externalUsers.get(firebase, externalUserId);
};

export const migrate = async (firebase, externalUserId, userId) => {
  const updates = {};

  const externalUserSnap = await client.externalUsers.get(
    firebase,
    externalUserId,
  );
  const externalUser = externalUserSnap.val();

  if (externalUser.user) {
    log.error(
      `ExternalUser with id=${externalUserId} is already associated with a user (userId: ${userId})`,
    );
    return;
  }

  // Set `user` on ExternalUser
  updates[
    `${modelPaths.EXTERNAL_USERS.string}/${externalUserId}/user`
  ] = userId;

  // Update `seller/sellerType` on all published SellerAds
  const externalUserAdsSnap = await firebase
    .ref(modelPaths.SELLER_ADS(externalUserId).string)
    .once('value');
  externalUserAdsSnap.forEach(adSnap => {
    const adId = adSnap.key;
    updates[`${modelPaths.ADS.string}/${adId}/seller`] = userId;
    updates[`${modelPaths.ADS.string}/${adId}/sellerType`] = sellerTypes.USER;
    updates[
      `${
        modelPaths.SELLER_ADS(externalUserId, adStatuses.PUBLISHED).string
      }/${adId}/seller`
    ] = userId;
    updates[
      `${
        modelPaths.SELLER_ADS(externalUserId, adStatuses.PUBLISHED).string
      }/${adId}/sellerType`
    ] =
      sellerTypes.USER;
  });

  // Update `seller/sellerType` on all rejected SellerAds
  const rejectedExternalUserAdsSnap = await firebase
    .ref(`${modelPaths.SELLER_ADS(externalUserId, adStatuses.REJECTED).string}`)
    .once('value');
  rejectedExternalUserAdsSnap.forEach(adSnap => {
    const adId = adSnap.key;
    updates[
      `${
        modelPaths.SELLER_ADS(externalUserId, adStatuses.REJECTED).string
      }/${adId}/seller`
    ] = userId;
    updates[
      `${
        modelPaths.SELLER_ADS(externalUserId, adStatuses.REJECTED).string
      }/${adId}/sellerType`
    ] =
      sellerTypes.USER;
  });

  // Update `seller/sellerType` on all deleted SellerAds
  const deletedExternalUserAdsSnap = await firebase
    .ref(`${modelPaths.SELLER_ADS(externalUserId, adStatuses.DELETED).string}`)
    .once('value');
  deletedExternalUserAdsSnap.forEach(adSnap => {
    const adId = adSnap.key;
    updates[
      `${
        modelPaths.SELLER_ADS(externalUserId, adStatuses.DELETED).string
      }/${adId}/seller`
    ] = userId;
    updates[
      `${
        modelPaths.SELLER_ADS(externalUserId, adStatuses.DELETED).string
      }/${adId}/sellerType`
    ] =
      sellerTypes.USER;
  });

  // Move conversations from externalUser to userId
  const externalUserConversationsSnap = await client.conversations.get(
    firebase,
    externalUserId,
  );
  if (externalUserConversationsSnap.exists()) {
    const userConversationsSnap = await client.conversations.get(
      firebase,
      userId,
    );
    const externalUserConversations = externalUserConversationsSnap.val();
    const userConversations = userConversationsSnap.val() || {};
    const conversations = R.merge(externalUserConversations, userConversations);
    updates[modelPaths.CONVERSATIONS(externalUserId).string] = null;
    updates[modelPaths.CONVERSATIONS(userId).string] = conversations;
  }

  await firebase.update('/', updates);

  // Move all the seller ads to userId
  const allExternalUserAdsSnap = await firebase
    .ref(`sellerAds/${externalUserId}`)
    .once('value');
  const allUserAdsSnap = await firebase
    .ref(`sellerAds/${userId}`)
    .once('value');
  if (allExternalUserAdsSnap.exists()) {
    const allExternalUserAds = allExternalUserAdsSnap.val();
    const userAds = allUserAdsSnap.val() || {};
    const allAds = {
      [adStatuses.PUBLISHED]: R.merge(
        allExternalUserAds[adStatuses.PUBLISHED],
        userAds[adStatuses.PUBLISHED],
      ),
      [adStatuses.REJECTED]: R.merge(
        allExternalUserAds[adStatuses.REJECTED],
        userAds[adStatuses.REJECTED],
      ),
      [adStatuses.DELETED]: R.merge(
        allExternalUserAds[adStatuses.DELETED],
        userAds[adStatuses.DELETED],
      ),
    };
    const allSelllerAdsUpdates = {};
    allSelllerAdsUpdates[`/sellerAds/${externalUserId}`] = null;
    allSelllerAdsUpdates[`/sellerAds/${userId}`] = allAds;
    await firebase.update('/', allSelllerAdsUpdates);
  }
};

export const externalUserWasDeleted = async (firebase, id) => {
  const updates = {};

  // Delete the code
  const code = await externalUserCodes.getCodeForExternalUser(firebase, id);
  updates[`${modelPaths.EXTERNAL_USER_CODES.string}/${code}`] = null;

  // Delete their published ads
  const sellerAdsSnap = await client.sellerAds.getAllPublished(firebase, id);
  R.compose(
    R.forEach(adId => {
      if (adId) {
        updates[`${modelPaths.ADS.string}/${adId}`] = null;
      }
    }),
    R.keys,
    R.defaultTo({}),
  )(sellerAdsSnap.val());

  // Delete sellerAds
  updates[`${modelPaths.SELLER_ADS(id, adStatuses.PUBLISHED).string}`] = null;
  updates[`${modelPaths.SELLER_ADS(id, adStatuses.REJECTED).string}`] = null;
  updates[`${modelPaths.SELLER_ADS(id, adStatuses.DELETED).string}`] = null;

  // Delete the convertExternalUserTask
  updates[`${modelPaths.CONVERT_EXTERNAL_USER_TASKS.string}/${id}`] = null;

  // Delete the completedConvertExternalUserTask
  updates[
    `${modelPaths.COMPLETED_CONVERT_EXTERNAL_USER_TASKS.string}/${id}`
  ] = null;

  // Delete submissionTasks
  const submissionTasks = await client.submissionTasks.getBySeller(
    firebase,
    id,
  );
  R.compose(
    R.forEach(submissionTaskId => {
      if (submissionTaskId) {
        updates[
          `${modelPaths.SUBMISSION_TASKS.string}/${submissionTaskId}`
        ] = null;
        updates[
          `${modelPaths.COMPLETED_SUBMISSION_TASKS.string}/${submissionTaskId}`
        ] = null;
      }
    }),
    R.keys,
    R.defaultTo({}),
  )(submissionTasks);

  // TODO should also delete conversations & messages

  return firebase.update('/', updates);
};
