import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import getTimestamp from '@pesposa/core/src/utils/getTimestamp';

const getLastActiveAtPath = (uid, conversationId) =>
  `/${modelPaths.CONVERSATIONS(uid).string}/${conversationId}/lastActiveAt`;

export const setLastActiveAt = (uid, conversationId) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const firebase = getFirebase();
  return firebase.set(
    getLastActiveAtPath(uid, conversationId),
    getTimestamp(firebase),
  );
};

export const setLastActiveAtOnDisconnect = (uid, conversationId) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const firebase = getFirebase();
  const ref = firebase.database().ref(getLastActiveAtPath(uid, conversationId));
  ref.onDisconnect().set(getTimestamp(firebase));
};

export const cancelSetLastActiveAtOnDisconnect = (uid, conversationId) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const ref = getFirebase()
    .database()
    .ref(getLastActiveAtPath(uid, conversationId));
  ref.onDisconnect().cancel();
};
