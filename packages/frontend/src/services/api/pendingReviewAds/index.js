import { modelPaths } from 'pesposa-config';

export const create = ad => (dispatch, getState, getFirebase) =>
  getFirebase().push(modelPaths.PENDING_REVIEW_ADS.string, ad);
