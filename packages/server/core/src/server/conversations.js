import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import * as notificationsConfig from '@pesposa/core/src/config/notifications';
import client from '@pesposa/core/src/client';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import * as users from './users';
import * as externalUserCodes from './externalUserCodes';

// TODO: extract paths to modelPaths

export const getAll = async firebase =>
  firebase.ref(modelPaths.ALL_CONVERSATIONS.string).once('value');

export const get = async (firebase, userId) =>
  firebase.ref(modelPaths.CONVERSATIONS(userId).string).once('value');

const hydrate = async (firebase, conversation) => {
  const adSnapshot = await client.ads.get(firebase, conversation.ad);
  const ad = adSnapshot.val();

  if (!ad) {
    return conversation;
  }

  let thisUserSnapshot;
  const isExternalUser = ad.sellerType === sellerTypes.EXTERNAL_USER;
  if (isExternalUser) {
    thisUserSnapshot = await client.externalUsers.get(
      firebase,
      conversation.thisUser,
    );
  } else {
    thisUserSnapshot = await users.get(firebase, conversation.thisUser);
  }
  const thisUser = thisUserSnapshot.val();

  let otherUserId;
  if (conversation.thisUser === conversation.buyer) {
    otherUserId = ad ? ad.seller : null;
  } else {
    otherUserId = conversation.buyer;
  }

  const otherUserSnapshot = await users.get(firebase, otherUserId);
  const otherUser = otherUserSnapshot.exists() ? otherUserSnapshot.val() : null;

  let externalUserCode = null;
  if (isExternalUser) {
    externalUserCode = await externalUserCodes.getCodeForExternalUser(
      firebase,
      ad.seller,
    );
  }

  return R.merge(conversation, {
    thisUser,
    isExternalUser,
    otherUser,
    ad,
    adId: conversation.ad,
    externalUserCode,
  });
};

export const getAllShouldNotify = async firebase => {
  const conversationsSnapshot = await getAll(firebase);

  if (
    !conversationsSnapshot.exists() ||
    isNilOrEmpty(conversationsSnapshot.val())
  ) {
    return [];
  }

  const conversationsList = await Promise.all(
    R.compose(
      R.map(async conversation => hydrate(firebase, conversation)),
      R.filter(
        ({ notified, lastMessageReceivedAt, lastActiveAt }) =>
          !notified &&
          !isNilOrEmpty(lastMessageReceivedAt) &&
          (isNilOrEmpty(lastActiveAt) ||
            lastMessageReceivedAt - lastActiveAt >=
              notificationsConfig.MESSAGE_RECEIVED_TIMEOUT),
      ),
      R.flatten,
      R.map(([userId, conversations]) =>
        R.compose(
          R.map(([conversationId, conversation]) =>
            R.merge(conversation, {
              thisUser: userId,
              conversationId,
              path: `${userId}/${conversationId}`,
            }),
          ),
          R.toPairs,
        )(conversations),
      ),
      R.toPairs,
    )(conversationsSnapshot.val()),
  );

  return R.reject(
    R.anyPass([
      R.propSatisfies(isNilOrEmpty, 'thisUser'),
      // TODO: we only send email notifications for now.
      // Later, we might consider sending SMS notifications
      R.pathSatisfies(isNilOrEmpty, ['thisUser', 'email']),
      R.propSatisfies(isNilOrEmpty, 'otherUser'),
      R.propSatisfies(isNilOrEmpty, 'ad'),
    ]),
    conversationsList,
  );
};

export const markAsNotified = (firebase, path) =>
  firebase.set(
    `/${modelPaths.ALL_CONVERSATIONS.string}/${path}/notified`,
    true,
  );
