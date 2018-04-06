import * as R from 'ramda';
import getTimestamp from '../utils/getTimestamp';
import * as modelPaths from '../config/modelPaths';
import * as statuses from '../config/convertExternalUserTaskStatuses';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const get = (firebase, externalUserId) =>
  firebase
    .ref(`${modelPaths.CONVERT_EXTERNAL_USER_TASKS.string}/${externalUserId}`)
    .once('value');

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const sendEmail = (firebase, externalUserId, adId) =>
  firebase.functions().httpsCallable('sendEmailToExternalUser')({
    externalUserId,
    adId,
  });

export const createEngagement = async (
  firebase,
  externalUserId,
  { channel, content },
) => {
  const finalEngagement = {
    channel,
    content,
    createdAt: getTimestamp(firebase),
  };
  firebase.push(
    `/${
      modelPaths.CONVERT_EXTERNAL_USER_TASKS.string
    }/${externalUserId}/engagements`,
    finalEngagement,
  );
};

export const complete = async (firebase, externalUserId, result) => {
  const taskSnap = await get(firebase, externalUserId);
  const task = taskSnap.val();
  const taskWithResult = R.assoc('result', result, task);
  const { key } = firebase
    .ref(
      `${
        modelPaths.COMPLETED_CONVERT_EXTERNAL_USER_TASKS.string
      }/${externalUserId}`,
    )
    .push();
  const updates = {
    [`${
      modelPaths.CONVERT_EXTERNAL_USER_TASKS.string
    }/${externalUserId}`]: null,
    [`${
      modelPaths.COMPLETED_CONVERT_EXTERNAL_USER_TASKS.string
    }/${externalUserId}/${key}`]: taskWithResult,
  };

  return firebase.update('/', updates);
};

export const archive = async (firebase, externalUserId) =>
  complete(firebase, externalUserId, {
    status: statuses.ARCHIVED,
  });
