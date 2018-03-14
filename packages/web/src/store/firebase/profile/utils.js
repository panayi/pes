import * as R from 'ramda';

// getPropInProviderData :: String -> Object | Null
const findProviderWithProp = propKey =>
  R.compose(R.find(R.prop(propKey)), R.propOr([], 'providerData'));

// getDisplayName :: User -> String | Null
const getDisplayName = R.converge(R.or, [
  R.compose(R.prop('displayName'), findProviderWithProp('displayName')),
  R.propOr(null, 'email'),
]);

// getPhoneNumber :: User -> String | Null
const getPhoneNumber = R.compose(
  R.propOr(null, 'phoneNumber'),
  findProviderWithProp('phoneNumber'),
);

// getAvatar :: User -> String | Null
const getAvatarUrl = R.compose(
  R.propOr(null, 'photoURL'),
  findProviderWithProp('photoURL'),
);

const getProviderData = R.prop('providerData');

const getProviderIds = R.compose(
  R.uniq,
  R.pluck('providerId'),
  R.propOr([], 'providerData'),
);

// profileFactory :: User -> Object
export const profileFactory = userData => ({
  email: userData.email,
  providerData: getProviderData(userData),
  profile: {
    displayName: getDisplayName(userData),
    avatarUrl: getAvatarUrl(userData),
    phoneNumber: getPhoneNumber(userData),
    providerIds: getProviderIds(userData),
  },
});
