import * as R from 'ramda';
import fetch from 'node-fetch';
import log from '@pesposa/core/src/utils/log';
import { legacyToLocal, ADS_ENDPOINT } from '@pesposa/core/src/services/legacy';
import * as pathsConfig from '../../config/paths';

const sequentialDownloadAd = async (index, ads) => {
  const ad = ads[index];
  await legacyToLocal(ad, pathsConfig.LEGACY_ADS_OUTPUT_PATH);

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

const command = program =>
  program
    .command('downloadLegacyAds')
    .description('Download legacy ads to local filesystem')
    .action(downloadLegacyAds);

export default command;
