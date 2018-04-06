import * as R from 'ramda';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import * as submissionTasks from '@pesposa/core/src/client/submissionTasks';
import { models } from '@pesposa/client-core/src/store/firebase/data';

export const create = submission => (dispatch, getState, getFirebase) => {
  const finalSubmission = R.assoc(
    'submitter',
    authSelectors.uidSelector(getState()),
    submission,
  );
  return submissionTasks.create(getFirebase(), finalSubmission);
};

export const updateSubmission = (id, submission) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const finalSubmission = R.filter(R.identity, submission);
  return submissionTasks.updateSubmission(getFirebase(), id, finalSubmission);
};

export const accept = (id, submission) => async (
  dispatch,
  getState,
  getFirebase,
) => {
  const { location } = submission;
  const locations = models.locations.all.selector(getState());
  const locationObject = R.compose(
    R.omit(['id']),
    R.find(R.propEq('id', location)),
  )(locations);
  const adProps = R.compose(
    R.filter(R.identity),
    R.assoc('location', locationObject),
    R.pick(['title', 'body', 'price', 'images', 'category']),
  )(submission);

  return submissionTasks.accept(getFirebase(), id, adProps);
};

export const reject = id => (dispatch, getState, getFirebase) =>
  submissionTasks.reject(getFirebase(), id);
