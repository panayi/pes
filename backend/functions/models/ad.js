import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from 'lib/firebaseClient';
import * as timestamp from 'utils/timestamp';

export const push = async ad => {
  const { images } = ad;
  const finalAd = R.compose(
    R.omit(['images']),
    R.assoc('createdAt', timestamp.get()),
  )(ad);

  const { key: adId } = await database.ref(`ads/published`).push(finalAd);

  if (!isNilOrEmpty(images)) {
    await database.ref(`/ads/images/${adId}`).set(images);
  }

  return adId;
};
