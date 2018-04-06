import getTimestamp from '@pesposa/core/src/utils/getTimestamp';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import * as statuses from '@pesposa/core/src/config/convertExternalUserTaskStatuses';
import client from '@pesposa/core/src/client';

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const adWasCreated = async (firebase, adId, ad) => {
  const { seller: externalUserId } = ad;

  // Do nothing when a task for this externalUser already exists
  const taskSnap = await client.convertExternalUserTasks.get(
    firebase,
    externalUserId,
  );
  if (taskSnap.exists()) {
    return null;
  }

  // Do nothing when a task has already been completed for this externalUser
  const completedTaskSnap = await firebase
    .ref(
      `${
        modelPaths.COMPLETED_CONVERT_EXTERNAL_USER_TASKS.string
      }/${externalUserId}`,
    )
    .once('value');
  if (completedTaskSnap.exists()) {
    return null;
  }

  // Else create the task
  const externalUserSnap = await client.externalUsers.get(
    firebase,
    externalUserId,
  );
  const externalUser = externalUserSnap.val();

  return firebase.set(
    `${modelPaths.CONVERT_EXTERNAL_USER_TASKS.string}/${externalUserId}`,
    {
      externalUser,
      createdAt: getTimestamp(firebase),
    },
  );
};

export const userDeletedAds = async (firebase, externalUserId) =>
  client.convertExternalUserTasks.complete(firebase, externalUserId, {
    status: statuses.USER_DELETED_ADS,
  });

export const converted = async (firebase, externalUserId) =>
  client.convertExternalUserTasks.complete(firebase, externalUserId, {
    status: statuses.CONVERTED,
  });
