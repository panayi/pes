/* @flow */
import * as R from 'ramda';
import debounce from 'lodash.debounce';
import firebaseApi from 'services/firebase';
import { track } from 'services/mixpanel';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as userInfoSelectors } from 'store/userInfo';
import * as createAdActions from './createAd/actions';
import * as changesActions from './changes/actions';
import * as createAdSelectors from './createAd/selectors';
import * as selectors from './selectors';
import * as constants from './constants';
import { serializeAd } from './utils';

const DEBOUNCE_TIMEOUT = 200; // ms

const updateDraft = debounce(
  (ad: Ad | {}, dispatch: Dispatch, getState: Function) => {
    const state = getState();
    const isIdle = createAdSelectors.isCreateAdIdleSelector(state);

    if (!isIdle) {
      return Promise.reject();
    }

    const uid = authSelectors.uidSelector(getState());

    return dispatch(firebaseApi.draftAd.update(uid, serializeAd(ad)));
  },
  DEBOUNCE_TIMEOUT,
);

export const saveDraft = (ad: Ad | {}) => (...args) => updateDraft(ad, ...args);

// Note that draftAd is also removed by a Firebase function.
// However there's no guarantee when it will be removed.
const removeDraft = () => (dispatch: Dispatch, getState: Function) => {
  const uid = authSelectors.uidSelector(getState());
  return dispatch(firebaseApi.draftAd.remove(uid));
};

export const createAd = (ad: Ad) => (
  dispatch: Dispatch,
  getState: Function,
) => {
  const state = getState();
  const isInSameCountry = userInfoSelectors.isInSameCountrySelector(state);

  if (!isInSameCountry) {
    return dispatch(
      createAdActions.createAdFailed(constants.USER_NOT_IN_SAME_COUNTRY_ERROR),
    );
  }

  const additionalData = {
    user: authSelectors.uidSelector(state),
    location: selectors.newAdLocationSelector(state),
  };
  const finalAd = R.compose(serializeAd, R.merge(ad))(additionalData);

  dispatch(createAdActions.createAdPending());

  return dispatch(firebaseApi.pendingReviewAds.create(finalAd))
    .then(id => dispatch(changesActions.adCreated(R.merge(finalAd, { id }))))
    .then(() => dispatch(createAdActions.createAdCompleted()))
    .then(() => dispatch(removeDraft()))
    .then(() => {
      track('createAd', selectors.adPropsForMixpanelSelector(finalAd));
    });
};

export const saveAd = (adId: string, ad: Ad) => (dispatch: Dispatch) => {
  const serializedAd = serializeAd(ad);
  const finalAd = R.omit(['images'], serializedAd);
  return dispatch(firebaseApi.ads.update(adId, finalAd)).then(() => {
    track('editAd', selectors.adPropsForMixpanelSelector(finalAd));
  });
};

export const removeAd = (adId: string) => async (dispatch: Dispatch) => {
  await dispatch(firebaseApi.ads.remove(adId));
  dispatch(changesActions.adDeleted(adId));
};
