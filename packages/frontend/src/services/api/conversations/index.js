import { modelPaths } from 'pesposa-config';

export const updateRead = (uid, conversationId, read) => (
  dispatch,
  getState,
  getFirebase,
) =>
  getFirebase().set(
    `/${modelPaths.CONVERSATIONS(uid).string}/${conversationId}/read`,
    read,
  );
