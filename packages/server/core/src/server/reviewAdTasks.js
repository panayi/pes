import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import getTimestamp from '@pesposa/core/src/utils/getTimestamp';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import * as taskResultsStatuses from '@pesposa/core/src/config/taskResultStatuses';
import client from '@pesposa/core/src/client';

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const remove = async (firebase, adId) =>
  firebase.remove(`${modelPaths.REVIEW_AD_TASKS.string}/${adId}`);

export const adWasCreated = (firebase, adId, ad) =>
  firebase.set(`${modelPaths.REVIEW_AD_TASKS.string}/${adId}`, {
    afterAd: ad,
    createdAt: getTimestamp(firebase),
  });

export const adWasUpdated = async (firebase, adId, change) => {
  const { beforeAd, afterAd } = change;

  // Check if the changes have been approved in the past
  // This can happen when a previous change was rejected, and changes have reverted
  const completedTasksSnap = await client.reviewAdTasks.getCompleted(
    firebase,
    adId,
  );
  const completedTasks = completedTasksSnap.val();
  const adPropsHash = JSON.stringify(afterAd.props);
  const alreadyApproved = R.compose(
    R.complement(isNilOrEmpty),
    R.find(
      R.compose(
        R.equals(adPropsHash),
        JSON.stringify,
        R.path(['afterAd', 'props']),
      ),
    ),
    R.filter(R.pathEq(['result', 'status'], taskResultsStatuses.ACCEPTED)),
    R.values,
    R.defaultTo({}),
  )(completedTasks);

  if (alreadyApproved) {
    // Approve it!
    return client.ads.approve(firebase, adId);
  }

  // Check if a task already exists for this ad
  const taskSnap = await client.reviewAdTasks.get(firebase, adId);

  let finalBeforeAd = beforeAd;
  if (taskSnap.exists()) {
    const task = taskSnap.val();
    finalBeforeAd = task.beforeAd;
  }

  // When before and after is the same, approve it.
  // This can happen when the user makes a change,
  // and then reverts that change.
  const isSame =
    finalBeforeAd &&
    JSON.stringify(finalBeforeAd.props) === JSON.stringify(afterAd.props);
  if (isSame) {
    // Approve it!
    return client.ads.approve(firebase, adId);
  }

  return firebase.set(`${modelPaths.REVIEW_AD_TASKS.string}/${adId}`, {
    beforeAd: finalBeforeAd,
    afterAd,
    createdAt: getTimestamp(firebase),
  });
};
