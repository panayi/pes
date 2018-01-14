import * as R from 'ramda';
import { database } from 'lib/firebaseClient';
import categories from 'database/seeds/categories.json';
import locales from 'database/seeds/locales.json';

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

export default async () => {
  await seedCategories();
  await seedLocales();
  return 'Seeded categories, locales';
};
