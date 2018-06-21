import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import importAdsToFirebase from './firebase';

export const importTestData = async options => {
  try {
    const howManyToImport = R.propOr(20, 'numberOfAds', options);
    const numberOfAds = await importAdsToFirebase(howManyToImport);
    log.info(`Firebase: Imported ${numberOfAds} ads`);
  } catch (error) {
    log.error('Firebase: Failed to import ads');
    throw error;
  }

  process.exit();
};

const command = program =>
  program
    .command('importTestData')
    .option('-n, --numberOfAds <n>', 'How many ads to import. Defaults to 20')
    .description('Import test data to Firebase and Algolia')
    .action(importTestData);

export default command;
