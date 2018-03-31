import * as R from 'ramda';
import { database } from '@pesposa/core/src/config/firebaseClient';
import log from '@pesposa/core/src/utils/log';
import promiseSerial from '@pesposa/core/src/utils/promiseSerial';
import * as storageService from '@pesposa/core/src/services/storage';
import categories from '@pesposa/core/src/database/seeds/categories.json';
import translations from '@pesposa/core/src/database/seeds/translations.json';
import countries from '@pesposa/core/src/config/countries';

const seedCategories = async () => {
  await database.ref('categories').set(categories);
};

const seedTranslations = async () => {
  await database.ref('translations').set(translations);
};

const seedCountryFlags = async () =>
  promiseSerial(
    R.compose(
      R.map(countryCode => () => {
        // eslint-disable-next-line
        const file = require('@pesposa/core/src/database/seeds/images/countries/' +
          R.toLower(countryCode) +
          '.png');
        return storageService.uploadImage(
          file,
          'image/png',
          'countries',
          `${countryCode}.png`,
          metadata => database.ref(`countryFlags/${countryCode}`).set(metadata),
        );
      }),
      R.pluck('code'),
    )(countries),
  );

export const seed = async () => {
  try {
    await seedCategories();
    await seedTranslations();
    await seedCountryFlags();
    log.info('Firebase: Seeded categories, locales, countries');
  } catch (error) {
    log.error('Firebase: Failed to seed data');
    throw error;
  }
};

const command = program =>
  program
    .command('seed')
    .description(
      'Seed Firebase DB with static data (categories, countryFlags, translations)',
    )
    .action(seed);

export default command;
