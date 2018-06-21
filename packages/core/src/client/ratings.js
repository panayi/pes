import * as modelPaths from '../config/modelPaths';

export const create = (firebase, uid, data) =>
  firebase.set(modelPaths.RATINGS(uid).string, data);
