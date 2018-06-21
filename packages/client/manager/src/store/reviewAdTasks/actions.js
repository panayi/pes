import * as reviewAdTasks from '@pesposa/core/src/client/reviewAdTasks';

export const approve = id => async (dispatch, getState, getFirebase) =>
  reviewAdTasks.approve(getFirebase(), id);

export const reject = (id, rejectionReason) => (
  dispatch,
  getState,
  getFirebase,
) => reviewAdTasks.reject(getFirebase(), id, rejectionReason);
