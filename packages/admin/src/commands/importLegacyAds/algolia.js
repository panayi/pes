import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from '@pesposa/core/src/config/firebaseClient';
import promiseSerial from '@pesposa/core/src/utils/promiseSerial';
import * as algoliaService from '@pesposa/core/src/services/algolia';

const importAds = async () => {
  const ads = (await database.ref('/ads/legacy').once('value')).val();
  const images = (await database.ref('/ads/images').once('value')).val();

  const finalAds = R.compose(
    R.values,
    R.mapObjIndexed((ad, adId) => {
      const imagesForAd = images[adId];
      return R.compose(
        R.reject(isNilOrEmpty),
        R.assoc('id', adId),
        R.assoc('legacy', true),
        R.assoc('images', imagesForAd),
      )(ad);
    }),
  )(ads);

  const groupOfAds = R.splitEvery(1000, finalAds);

  return promiseSerial(
    R.map(group => () => algoliaService.addMany(group), groupOfAds),
  );
};

export default importAds;
