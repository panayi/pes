import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from '../config/firebaseClient';
import * as notificationsConfig from '../config/notifications';
import * as userModel from './user';
import * as adModel from './ad';

export const getAll = async () =>
  database.ref('/myConversations').once('value');

export const get = async userId =>
  database.ref(`/myConversations/${userId}`).once('value');

const hydrate = async conversation => {
  const thisUserSnapshot = await userModel.get(conversation.thisUser);
  const thisUser = thisUserSnapshot.exists() ? thisUserSnapshot.val() : null;
  const adSnapshot = await adModel.get(conversation.ad);
  const ad = adSnapshot.exists() ? adSnapshot.val() : null;
  let otherUserId;

  if (conversation.thisUser === conversation.buyer) {
    otherUserId = ad ? ad.user : null;
  } else {
    otherUserId = conversation.buyer;
  }

  const otherUserSnapshot = await userModel.get(otherUserId);
  const otherUser = otherUserSnapshot.exists() ? otherUserSnapshot.val() : null;

  return R.merge(conversation, {
    thisUser,
    otherUser,
    ad,
  });
};

export const getAllShouldNotify = async () => {
  const conversationsSnapshot = await getAll();

  if (
    !conversationsSnapshot.exists() ||
    isNilOrEmpty(conversationsSnapshot.val())
  ) {
    return [];
  }

  const conversationsList = await Promise.all(
    R.compose(
      R.map(async conversation => hydrate(conversation)),
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

export const markAsNotified = path =>
  database.ref(`/myConversations/${path}/notified`).set(true);
