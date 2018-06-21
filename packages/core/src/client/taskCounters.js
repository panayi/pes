import * as modelPaths from '../config/modelPaths';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const get = async (firebase, taskType) =>
  firebase.ref(modelPaths.TASK_COUNTERS(taskType).string).once('value');
