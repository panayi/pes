import * as modelPaths from '../config/modelPaths';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const getAll = async firebase =>
  firebase.ref(`${modelPaths.CATEGORIES.string}`).once('value');
