/* eslint-disable no-console */
import { database } from '../../lib/firebase';
import categories from '../../lib/seeds/categories.json';

const seedCategories = async () => {
  const ref = database.ref('categories');
  await ref.set(categories);

  console.log('Seed: categories');
};

export default async (req, res) => {
  await seedCategories();

  res.send('Done');
};
