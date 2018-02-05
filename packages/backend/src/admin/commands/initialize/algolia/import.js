import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import log from 'utils/log';
import { database } from 'lib/firebaseClient';
import * as algoliaService from 'services/algolia';

const initialImportAds = async () => {
  const ads = (await database.ref('/ads/published').once('value')).val();
  const images = (await database.ref('/ads/images').once('value')).val();

  const finalAds = R.compose(
    R.values,
    R.mapObjIndexed((ad, adId) => {
      const imagesForAd = images[adId];
      return R.compose(
        R.reject(isNilOrEmpty),
        R.assoc('id', adId),
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
