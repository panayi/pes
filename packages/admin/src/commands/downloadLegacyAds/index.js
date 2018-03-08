import * as R from 'ramda';
import fetch from 'node-fetch';
import log from '@pesposa/core/src/utils/log';
import { legacyToLocal, ADS_ENDPOINT } from '@pesposa/core/src/services/legacy';

const sequentialDownloadAd = async (index, ads) => {
  const ad = ads[index];
  await legacyToLocal(ad, __dirname);
  log.info(`Firebase: Downloaded ${ad.categoryParent} ad with id = ${ad.id}`);

  if (R.isNil(ads[index + 1])) {
    return Promise.resolve();
  }

  return sequentialDownloadAd(index + 1, ads);
};

const downloadLegacyAds = async () => {
  try {
    const response = await fetch(ADS_ENDPOINT);
    const ads = await response.json();
    await sequentialDownloadAd(0, ads);

    const numberOfAds = R.compose(R.length, R.values)(ads);
    return `Downloaded ${numberOfAds} ads`;
  } catch (error) {
    log.error('Firebase: Failed to download legacy ads');
    throw error;
  }
};

export default downloadLegacyAds;
