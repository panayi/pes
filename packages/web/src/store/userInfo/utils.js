import * as R from 'ramda';
import * as locationConfig from '@pesposa/core/src/config/location';
import * as selectors from './selectors';
import * as constants from './constants';

// For location: prefer GEOLOCATION_SOURCE_ID over IP_SOURCE_ID
// For everything else: prefer initialState (as it is passed by the server and more recent)
export const mergeState = (initialState, persistedState) => {
  const persistedSource = R.path(['userInfo', 'source'], persistedState);

  let stateToUseForLocation = initialState || persistedState;
  if (persistedSource === locationConfig.GEOLOCATION_SOURCE_ID) {
    stateToUseForLocation = persistedState || initialState;
  }

  const locationState = selectors.locationSelector(stateToUseForLocation);

  return R.compose(
    R.assocPath(constants.LOCATION_PATH, locationState),
    R.merge(persistedState),
  )(initialState);
};
