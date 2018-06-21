import * as modelPaths from '../config/modelPaths';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const get = async (firebase, uid) =>
  firebase.ref(modelPaths.DRAFTS(uid).string).once('value');

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const update = (firebase, uid, data) =>
  firebase.update(modelPaths.DRAFTS(uid).string, data);

export const set = async (firebase, draft, uid) =>
  firebase.set(modelPaths.DRAFTS(uid).string, draft);

export const remove = (firebase, uid) =>
  firebase.remove(modelPaths.DRAFTS(uid).string);
