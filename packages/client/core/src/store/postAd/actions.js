import * as R from 'ramda';
import debounce from 'lodash.debounce';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import * as drafts from '@pesposa/core/src/client/drafts';
import * as ads from '@pesposa/core/src/client/ads';
import { track } from '../../services/mixpanel';
import { selectors as authSelectors } from '../firebase/auth';
import { selectors as userInfoSelectors } from '../userInfo';
import * as createAdActions from './createAd/actions';
import * as changesActions from './changes/actions';
import * as createAdSelectors from './createAd/selectors';
import * as selectors from './selectors';
import * as constants from './constants';
import { serializeAd } from './utils';

const DEBOUNCE_TIMEOUT = 500; // ms

const updateDraft = debounce((ad, dispatch, getState, getFirebase) => {
  const state = getState();
  const isIdle = createAdSelectors.isCreateAdIdleSelector(state);

  if (!isIdle) {
    return Promise.reject();
  }

  const uid = authSelectors.uidSelector(getState());

  return drafts.update(getFirebase(), uid, serializeAd(ad));
}, DEBOUNCE_TIMEOUT);

export const saveDraft = ad => (...args) => updateDraft(ad, ...args);

// Note that the draft is also removed by a Firebase function.
// However there's no guarantee when it will be removed.
const removeDraft = () => (dispatch, getState, getFirebase) => {
  const uid = authSelectors.uidSelector(getState());
  return drafts.remove(getFirebase(), uid);
};

export const createAd = adProps => async (dispatch, getState, getFirebase) => {
  const state = getState();
  const isInSameCountry = userInfoSelectors.isInSameCountrySelector(state);

  if (!isInSameCountry) {
    return dispatch(
      createAdActions.createAdFailed(constants.USER_NOT_IN_SAME_COUNTRY_ERROR),
    );
  }

  const location = R.compose(
    R.omit(['source']),
    selectors.newAdLocationSelector,
  )(state);
  const additionalData = {
    location,
  };
  const finalAdProps = R.compose(
    serializeAd,
    R.merge(adProps),
  )(additionalData);
  const rootProps = {
    seller: authSelectors.uidSelector(state),
    sellerType: sellerTypes.USER,
  };
  dispatch(createAdActions.createAdPending());

  const adSnap = await ads.create(getFirebase(), finalAdProps, rootProps);
  const ad = adSnap.val();
  const id = ad.key;
  dispatch(changesActions.adCreated(R.merge(ad, { id })));
  dispatch(createAdActions.createAdCompleted());
  dispatch(removeDraft());
  return track('createAd', selectors.adPropsForMixpanelSelector(ad));
};

export const saveAd = (adId, adProps, ad) => async (
  dispatch,
  getState,
  getFirebase,
) => {
  const previousAdProps = R.propOr({}, 'props', ad);
  const finalAdProps = R.merge(previousAdProps, adProps);
  const serializedAdProps = serializeAd(finalAdProps);
  await ads.update(getFirebase(), adId, serializedAdProps);
  track('editAd', selectors.adPropsForMixpanelSelector(serializedAdProps));
};

export const removeAd = adId => async (dispatch, getState, getFirebase) => {
  await ads.remove(getFirebase(), adId);
  dispatch(changesActions.adDeleted(adId));
};
