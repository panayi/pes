import * as modelPaths from 'constants/modelPaths';

export const create = ad => (dispatch, getState, getFirebase) =>
  getFirebase().push(modelPaths.PENDING_REVIEW_ADS.string, ad);
