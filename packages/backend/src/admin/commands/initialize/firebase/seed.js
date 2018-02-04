import * as R from 'ramda';
import { database } from 'lib/firebaseClient';
import log from 'utils/log';
import * as storageService from 'services/storage';
import categories from 'pesposa-database/src/seeds/categories.json';
import locales from 'pesposa-database/src/seeds/locales.json';
import translations from 'pesposa-database/src/seeds/translations.json';
import countries from 'pesposa-database/src/seeds/countries.json';

const formatCategories = R.reduce(
  (acc, category) =>
    R.useWith(R.merge, [
      R.identity,
      R.converge(R.assoc(R.__, R.__, {}), [
        R.prop('key'),
        R.over(
          R.lensProp('categories'),
          R.compose(formatCategories, R.defaultTo([])),
        ),
      ]),
    ])(acc, category),
  {},
);

const seedCategories = async () => {
  await database.ref('categories').set(formatCategories(categories));
};

const seedLocales = async () => {
  await database.ref('locales').set(locales);
};

const seedTranslations = async () => {
  await database.ref('translations').set(translations);
};

const seedCountries = async () => {
  await database.ref('countries').set(countries);

  return Promise.all(
    R.compose(
      R.map(countryCode => {
        // eslint-disable-next-line
        const file = require('svg-country-flags/png1000px/' +
          R.toLower(countryCode) +
          '.png');
        return storageService.uploadImage(
          file,
          'image/png',
          'countries',
          `${countryCode}.png`,
          metadata =>
            database
              .ref(`countries/${countryCode}`)
              .child('flag')
              .set(metadata),
        );
      }),
      R.keys,
    )(countries),
  );
};

const seed = async () => {
  try {
    await seedCategories();
    await seedLocales();
    await seedTranslations();
    await seedCountries();
    return 'Seeded categories, locales, countries';
  } catch (error) {
    log.error('Firebase: Failed to seed data');
    throw error;
  }
};

export default seed;
