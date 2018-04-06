import * as modelPaths from '../config/modelPaths';

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const update = (firebase, id, data) =>
  firebase.update(`/${modelPaths.PENDING_TASKS.string}/${id}`, data);
