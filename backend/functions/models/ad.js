import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from 'lib/firebaseClient';
import * as gmapsService from 'services/gmaps';
import * as timestamp from 'utils/timestamp';
import * as userModel from './user';

export const create = async ad => {
  const { images, user } = ad;
  const geoposition = await userModel.getGeoposition(user);
  const address = await gmapsService.reverseGeocode(geoposition);
  const location = R.merge(address, { geoposition });

  const finalAd = R.compose(
    R.omit(['images']),
    R.assoc('location', location),
    R.assoc('createdAt', timestamp.get()),
  )(ad);

  const { key: adId } = await database.ref(`ads/published`).push(finalAd);

  if (!isNilOrEmpty(images)) {
    await database.ref(`/ads/images/${adId}`).set(images);
  }

  return adId;
};
