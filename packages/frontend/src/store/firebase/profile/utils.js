import * as R from 'ramda';
import { renameKeys } from 'ramda-adjunct';

// getPropInProviderData :: String -> Object | Null
const findProviderWithProp = propKey =>
  R.compose(R.find(R.prop(propKey)), R.propOr([], 'providerData'));

// getDisplayName :: User -> String | Null
const getDisplayName = R.converge(R.or, [
  R.compose(R.prop('displayName'), findProviderWithProp('displayName')),
  R.propOr(null, 'email'),
]);

// getPhoto :: User -> { downloadURL, providerId }
const getPhoto = R.compose(
  renameKeys({ photoURL: 'downloadURL' }),
  R.pick(['photoURL', 'providerId']),
  R.defaultTo({}),
  findProviderWithProp('photoURL'),
);

const getProviderData = R.prop('providerData');

const getProviderIds = R.compose(
  R.uniq,
  R.pluck('providerId'),
  R.propOr([], 'providerData'),
);

// profileFactory :: User -> Object
export const profileFactory = (userData, profile) => ({
  email: userData.email,
  providerData: getProviderData(userData),
  profile: {
    ...R.propOr({}, 'profile', profile),
    displayName: getDisplayName(userData),
    image: getPhoto(userData),
    providerIds: getProviderIds(userData),
  },
});
