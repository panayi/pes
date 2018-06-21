import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as authSelectors } from '../firebase/auth';
import { selectors as userInfoSelectors } from '../userInfo';

// adImagesPathSelector :: Props -> Object | Nil
export const adImagesPathSelector = createSelector(
  propSelector('adId'),
  adId => `${modelPaths.ADS.string}/${adId}/props/images`,
);

// draftImagesPathSelector :: State -> Object | Nil
export const draftImagesPathSelector = createSelector(
  authSelectors.uidSelector,
  R.unless(R.isNil, uid => `${modelPaths.DRAFTS(uid).string}/images`),
);

export const newAdLocationSelector = createSelector(
  userInfoSelectors.locationSelector,
  location => {
    const countryCode = R.path(['address', 'country', 'cca2'], location);
    return isNilOrEmpty(countryCode)
      ? location
      : R.assocPath(['address', 'country'], countryCode, location);
  },
);

// adPropsForMixpanelSelector :: Ad -> Object
export const adPropsForMixpanelSelector = R.compose(
  R.evolve({
    location: R.prop('address'),
  }),
  R.pick(['title', 'category', 'location']),
);
