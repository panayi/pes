import * as R from 'ramda';
import categories from 'seeds/categories.json';
import { database } from '../../lib/firebaseClient';

const formatCategories = R.reduce((acc, category) => (
  R.useWith(R.merge, [
    R.identity,
    R.converge(R.assoc(R.__, R.__, {}), [
      R.prop('name'),
      R.over(
        R.lensProp('categories'),
        R.compose(
          formatCategories,
          R.defaultTo([]),
        ),
      ),
    ]),
  ])(acc, category)
), {});

const seedCategories = async () => {
  await database.ref('categories').set(formatCategories(categories));
};

export default async () => {
  await seedCategories();
  return 'Seeded categories';
};
