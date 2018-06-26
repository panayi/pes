import * as modelPaths from '../config/modelPaths';
import getTimestamp from '../utils/getTimestamp';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const get = (firebase, uid) =>
  firebase.ref(modelPaths.CONVERSATIONS(uid).string).once('value');

const getLastActiveAtPath = (uid, conversationId) =>
  `/${modelPaths.CONVERSATIONS(uid).string}/${conversationId}/lastActiveAt`;

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const setLastActiveAt = (firebase, uid, conversationId) =>
  firebase.set(
    getLastActiveAtPath(uid, conversationId),
    getTimestamp(firebase),
  );

export const setLastActiveAtOnDisconnect = (firebase, uid, conversationId) => {
  const ref = firebase.ref(getLastActiveAtPath(uid, conversationId));
  ref.onDisconnect().set(getTimestamp(firebase));
};

export const cancelSetLastActiveAtOnDisconnect = (
  firebase,
  uid,
  conversationId,
) => {
  const ref = firebase.ref(getLastActiveAtPath(uid, conversationId));
  ref.onDisconnect().cancel();
};
