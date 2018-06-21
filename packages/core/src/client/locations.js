import * as modelPaths from '../config/modelPaths';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const getAll = async firebase =>
  firebase.ref(modelPaths.LOCATIONS.string).once('value');
