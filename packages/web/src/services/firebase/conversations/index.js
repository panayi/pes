import * as modelPaths from '@pesposa/core/src/config/modelPaths';

export const updateRead = (uid, conversationId, read) => (
  dispatch,
  getState,
  getFirebase,
) =>
  getFirebase().set(
    `/${modelPaths.CONVERSATIONS(uid).string}/${conversationId}/read`,
    read,
  );
