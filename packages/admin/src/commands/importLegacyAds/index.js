import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import importAdsToFirebase from './firebase';
import importAdsToAlgolia from './algolia';

export const importLegacyAds = async options => {
  try {
    const howManyToImport = R.prop('import', options);
    const numberOfAds = await importAdsToFirebase(howManyToImport);
    log.info(`Firebase: Imported ${numberOfAds} ads`);
  } catch (error) {
    log.error('Firebase: Failed to import legacy ads');
    throw error;
  }

  try {
    const ads = await importAdsToAlgolia();
    log.info(`Algolia: Imported ${ads.length} ads`);
  } catch (error) {
    log.error('Algolia: Failed to import ads');
    throw error;
  }

  process.exit();
};

const command = program =>
  program
    .command('importLegacyAds')
    .option('-i, --import <n>', 'How many legacy ads to import')
    .description('Import legacy ads to Firebase and Algolia')
    .action(importLegacyAds);

export default command;
