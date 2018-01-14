import * as R from 'ramda';
import fetch from 'node-fetch';
import log from 'utils/log';
import { database } from 'lib/firebaseClient';
import { importAd, ADS_ENDPOINT } from 'services/legacy';

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
  await sequentialImportAd(0, ads);

  return R.compose(R.length, R.values)(ads);
};

export default async () => {
  const numberOfAds = await importAds();
  return `Synced ${numberOfAds} ads`;
};
