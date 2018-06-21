import * as R from 'ramda';
import { nameSelector } from '@pesposa/core/src/selectors/users';

// getPropInProviderData :: String -> Object | Null
const findProviderWithProp = propKey =>
  R.compose(R.find(R.prop(propKey)), R.propOr([], 'providerData'));

// getPhoneNumber :: User -> String | Null
const getPhoneNumber = R.compose(
  R.propOr(null, 'phoneNumber'),
  findProviderWithProp('phoneNumber'),
);

// getDisplayName :: User -> String | Null
const getDisplayName = R.converge(
  (name, phone, email) => nameSelector({ name, phone, email }),
  [
    R.compose(R.prop('displayName'), findProviderWithProp('displayName')),
    getPhoneNumber,
    R.propOr(null, 'email'),
  ],
);

const getProviderData = R.prop('providerData');

const getProviderIds = R.compose(
  R.uniq,
  R.pluck('providerId'),
  R.propOr([], 'providerData'),
);

// profileFactory :: User -> Object
export const profileFactory = userData => ({
  providerData: getProviderData(userData),
  email: userData.email,
  phone: getPhoneNumber(userData),
  profile: {
    name: getDisplayName(userData),
    phone: getPhoneNumber(userData),
    providerIds: getProviderIds(userData),
  },
});
