import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

const maskPhoneNumber = R.compose(
  R.converge(R.compose(R.join(''), R.flatten, R.unapply(R.identity)), [
    R.compose(R.nth(0), R.splitAt(4)),
    R.compose(R.times(R.always('*')), R.subtract(R.__, 7), R.length),
    R.compose(R.nth(1), R.splitAt(-3)),
  ]),
  R.split(''),
);

// getPropInProviderData :: String -> Object | Null
const findProviderWithProp = propKey =>
  R.compose(R.find(R.prop(propKey)), R.propOr([], 'providerData'));

// getPhoneNumber :: User -> String | Null
const getPhoneNumber = R.compose(
  R.propOr(null, 'phoneNumber'),
  findProviderWithProp('phoneNumber'),
);

// getDisplayName :: User -> String | Null
const getDisplayName = R.converge((a, b, c) => a || b || c, [
  R.compose(R.prop('displayName'), findProviderWithProp('displayName')),
  R.propOr(null, 'email'),
  R.compose(R.unless(isNilOrEmpty, maskPhoneNumber), getPhoneNumber),
]);

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
