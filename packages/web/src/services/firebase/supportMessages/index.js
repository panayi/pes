import * as modelPaths from '@pesposa/core/src/config/modelPaths';

export const create = ad => (dispatch, getState, getFirebase) =>
  getFirebase().push(modelPaths.SUPPORT_MESSAGES.string, ad);
