import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import log from '@pesposa/core/src/utils/log';
import { database } from '@pesposa/core/src/config/firebaseClient';
import algoliaService from '@pesposa/core/src/services/algolia';

const initialImportAds = async () => {
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

  return algoliaService.addMany(finalAds);
};

const initialImport = async () => {
  try {
    const ads = await initialImportAds();
    return [`Imported ${ads.length} ads`];
  } catch (error) {
    log.error('Algolia: Failed to import ads');
    throw error;
  }
};

export default initialImport;
