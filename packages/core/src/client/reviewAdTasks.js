import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import * as modelPaths from '../config/modelPaths';
import * as taskResultStatuses from '../config/taskResultStatuses';
import * as ads from './ads';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const get = (firebase, adId) =>
  firebase.ref(`${modelPaths.REVIEW_AD_TASKS.string}/${adId}`).once('value');

export const getCompleted = (firebase, adId) =>
  firebase
    .ref(`${modelPaths.COMPLETED_REVIEW_AD_TASKS.string}/${adId}`)
    .once('value');

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
const complete = async (firebase, adId, result) => {
  const { status } = result;
  const taskSnap = await get(firebase, adId);
  const task = taskSnap.val();

  if (status === taskResultStatuses.REJECTED) {
    const { beforeAd, afterAd } = task;
    const isNewAd = isNilOrEmpty(beforeAd);

    if (isNewAd) {
      await ads.reject(firebase, adId, afterAd);
    } else {
      await ads.revert(firebase, adId, beforeAd);
    }
  }

  const taskWithResult = R.assoc('result', result, task);
  const { key } = firebase
    .ref(`${modelPaths.COMPLETED_REVIEW_AD_TASKS.string}/${adId}`)
    .push();
  const updates = {
    [`${modelPaths.REVIEW_AD_TASKS.string}/${adId}`]: null,
    [`${
      modelPaths.COMPLETED_REVIEW_AD_TASKS.string
    }/${adId}/${key}`]: taskWithResult,
  };

  return firebase.update('/', updates);
};

export const approve = async (firebase, adId) =>
  complete(firebase, adId, {
    status: taskResultStatuses.ACCEPTED,
  });

export const reject = async (firebase, adId, rejectionReason) =>
  complete(firebase, adId, {
    status: taskResultStatuses.REJECTED,
    rejectionReason,
  });
