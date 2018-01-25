import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from 'lib/firebaseClient';
import getLocationFromIp from 'utils/getLocationFromIp';
import * as gmapsService from 'services/gmaps';
import * as draftAdModel from './draftAd';
import * as countryModel from './country';

export const get = async userId =>
  database.ref(`/users/${userId}`).once('value');

export const update = async (props, userId) =>
  database.ref(`/users/${userId}`).update(props);

export const remove = async userId => database.ref(`/users/${userId}`).remove();

export const setLocation = async ({ ip, geoposition }, userId) => {
  let location;

  if (isNilOrEmpty(geoposition)) {
    location = R.merge(getLocationFromIp(ip), { from: 'IP' });
  } else {
    const address = await gmapsService.reverseGeocode(geoposition);
    location = { address, geoposition, from: 'navigator.geolocation' };
  }

  const countryCode = R.path(['address', 'country'], location);
  const countrySnapshot = await countryModel.get(countryCode);
  const country = countrySnapshot.val();

  // Location is outside of the supported countries
  if (isNilOrEmpty(country)) {
    const defaultCountry = await countryModel.getDefault();
    location = {
      address: {
        country: defaultCountry.code,
      },
      geoposition: defaultCountry.geoposition,
      from: 'default',
    };
  }

  await update({ ip, location }, userId);
};

export const migrateAnonymousUser = async (anonymousUserId, userId) => {
  const anonymousUserSnapshot = await get(anonymousUserId);
  const userSnapshot = await get(userId);

  if (isNilOrEmpty(anonymousUserSnapshot)) {
    throw new Error(`Anonymous user with id=${anonymousUserId} does not exist`);
  }

  if (isNilOrEmpty(userSnapshot)) {
    throw new Error(`User with id=${userId} does not exist`);
  }

  // Move {`ip`, `location`, `locationFromIp`} from anonymousUser to user
  const migrateProps = R.pick(
    ['ip', 'location', 'locationFromIp'],
    anonymousUserSnapshot.val(),
  );
  await update(migrateProps, userId);

  // Move draft ad from anonymousUser to user
  await draftAdModel.move(anonymousUserId, userId);

  // Delete anonymousUser
  return remove(anonymousUserId);
};

export const associateAd = async (adId, userId) =>
  database.ref(`ads/byUser/${userId}/${adId}`).set(true);
