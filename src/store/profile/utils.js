import * as R from 'ramda';

// getPropInProviderData :: String -> Any
const getPropInProviderData = propKey =>
  R.compose(R.find(R.identity), R.pluck(propKey), R.propOr([], 'providerData'));

// getDisplayName :: User -> String | Nil
const getDisplayName = R.converge(R.or, [
  getPropInProviderData('displayName'),
  R.propOr(null, 'email'),
]);

// getPhotoUrl :: User -> String | Nil
const getPhotoUrl = R.compose(
  R.defaultTo(null),
  getPropInProviderData('photoURL'),
);

// profileFactory :: User -> Object
export const profileFactory = user => {
  const profile = {
    email: user.email,
    providerData: user.providerData,
    profile: {
      displayName: getDisplayName(user),
      avatarUrl: getPhotoUrl(user),
    },
  };

  if (user.geoposition) {
    profile.geoposition = user.geoposition;
  }

  return profile;
};
