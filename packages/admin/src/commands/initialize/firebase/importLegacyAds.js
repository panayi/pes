import * as R from 'ramda';
import fetch from 'node-fetch';
import log from '@pesposa/core/src/utils/log';
import { database } from '@pesposa/core/src/config/firebaseClient';
import { importAd, ADS_ENDPOINT } from '@pesposa/core/src/services/legacy';

const sequentialImportAd = async (index, ads) => {
  const ad = ads[index];
  await importAd(ad, database);
  log.info(`Firebase: Synced ${ad.categoryParent} ad with id = ${ad.id}`);

  if (R.isNil(ads[index + 1])) {
    return Promise.resolve();
  }

  return sequentialImportAd(index + 1, ads);
};

const importAds = async () => {
  const response = await fetch(ADS_ENDPOINT);
  const ads = await response.json();
  const some = R.take(4, ads);
  await sequentialImportAd(0, some);

  return R.compose(R.length, R.values)(some);
};

const importLegacyAds = async () => {
  try {
    const numberOfAds = await importAds();
    return `Synced ${numberOfAds} ads`;
  } catch (error) {
    log.error('Firebase: Failed to import legacy ads');
    throw error;
  }
};

export default importLegacyAds;
