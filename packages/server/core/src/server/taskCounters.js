import * as R from 'ramda';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const set = async (firebase, taskType) => {
  const tasksSnap = await firebase
    .ref(modelPaths.TASKS(taskType).string)
    .once('value');
  const tasksCount = R.compose(
    R.when(R.equals(0), R.always(null)),
    R.defaultTo(0),
    R.length,
    R.values,
    R.defaultTo({}),
  )(tasksSnap.val());

  return firebase.set(modelPaths.TASK_COUNTERS(taskType).string, tasksCount);
};
