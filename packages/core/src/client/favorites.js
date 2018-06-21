import * as modelPaths from '../config/modelPaths';

export const create = (firebase, uid, adId) =>
  firebase.set(`/${modelPaths.FAVORITES(uid).string}/${adId}`, true);

export const remove = (firebase, uid, adId) =>
  firebase.remove(`/${modelPaths.FAVORITES(uid).string}/${adId}`);
