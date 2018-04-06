import * as R from 'ramda';
import * as modelPaths from '../config/modelPaths';
import * as taskResultStatuses from '../config/taskResultStatuses';
import getTimestamp from '../utils/getTimestamp';
import * as sellerTypes from '../config/sellerTypes';
import * as ads from './ads';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const get = (firebase, id) =>
  firebase.ref(`${modelPaths.SUBMISSION_TASKS.string}/${id}`).once('value');

// TODO: This is getting all objects and then filtering.
// Not sure if we can use equalTo with deep child.
export const getBySeller = async (firebase, seller) => {
  const snap = await firebase
    .ref(modelPaths.SUBMISSION_TASKS.string)
    .once('value');
  return R.compose(
    R.filter(R.pathEq(['submission', 'seller'], seller)),
    R.defaultTo({}),
  )(snap.val());
};

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const create = async (firebase, submission) => {
  const task = {
    submission,
    createdAt: getTimestamp(firebase),
  };
  const ref = await firebase.push(modelPaths.SUBMISSION_TASKS.string, task);
  return ref.getKey();
};

export const updateSubmission = async (firebase, id, submission) =>
  firebase.update(
    `/${modelPaths.SUBMISSION_TASKS.string}/${id}/submission`,
    submission,
  );

const complete = async (firebase, id, result) => {
  const { status } = result;
  const taskSnap = await get(firebase, id);
  const task = taskSnap.val();

  if (status === taskResultStatuses.ACCEPTED) {
    const { submission } = task;
    const { adProps } = result;
    const seller = R.prop('seller', submission);
    const source = R.prop('source', submission);
    const rootProps = R.filter(R.identity, {
      seller,
      sellerType: sellerTypes.EXTERNAL_USER,
      source,
    });
    await ads.create(firebase, adProps, rootProps);
  }

  const taskWithResult = R.assoc('result', result, task);
  const updates = {
    [`${modelPaths.SUBMISSION_TASKS.string}/${id}`]: null,
    [`${modelPaths.COMPLETED_SUBMISSION_TASKS.string}/${id}`]: taskWithResult,
  };

  return firebase.update('/', updates);
};

export const accept = async (firebase, id, adProps) =>
  complete(firebase, id, {
    status: taskResultStatuses.ACCEPTED,
    adProps,
  });

export const reject = async (firebase, id) =>
  complete(firebase, id, {
    status: taskResultStatuses.REJECTED,
  });
