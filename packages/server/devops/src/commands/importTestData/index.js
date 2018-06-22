import * as R from 'ramda';
import logger from 'winston-color';
import importAdsToFirebase from './firebase';

export const importTestData = async options => {
  try {
    const howManyToImport = R.propOr(20, 'numberOfAds', options);
    const numberOfAds = await importAdsToFirebase(howManyToImport);
    logger.info(`Firebase: Imported ${numberOfAds} ads`);
  } catch (error) {
    logger.error('Firebase: Failed to import ads');
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
