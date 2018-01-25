import * as R from 'ramda';
import { database } from 'lib/firebaseClient';
import * as storageService from 'services/storage';
import categories from 'database/seeds/categories.json';
import locales from 'database/seeds/locales.json';
import countries from 'database/seeds/countries.json';

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

export default async () => {
  await seedCategories();
  await seedLocales();
  await seedCountries();
  return 'Seeded categories, locales, countries';
};
