import fs from 'fs';
import path from 'path';
import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import { database } from '@pesposa/core/src/config/firebaseClient';
import { localToFirebase } from '@pesposa/core/src/services/legacy';
import promiseSerial from '@pesposa/core/src/utils/promiseSerial';
import * as pathsConfig from '../../../config/paths';

const dirs = p =>
  fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());

const importAds = async howManyToImport => {
  const localAdIds = dirs(pathsConfig.LEGACY_ADS_OUTPUT_PATH);
  const finalLocalAdIds = R.isNil(howManyToImport)
    ? localAdIds
    : R.take(howManyToImport, localAdIds);

  await promiseSerial(
    R.map(
      adId => () =>
        localToFirebase(adId, database, pathsConfig.LEGACY_ADS_OUTPUT_PATH),
      finalLocalAdIds,
    ),
  );

  return R.length(finalLocalAdIds);
};

const importLegacyAds = async options => {
  try {
    const howManyToImport = R.prop('import', options);
    const numberOfAds = await importAds(howManyToImport);
    return `Synced ${numberOfAds} ads`;
  } catch (error) {
    log.error('Firebase: Failed to import legacy ads');
    throw error;
  }
};

export default importLegacyAds;
