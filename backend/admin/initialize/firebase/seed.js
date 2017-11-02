import categories from 'seeds/categories.json';
import { database } from '../../lib/firebaseClient';

const seedCategories = async () => {
  await database.ref('categories').set(categories);
};

export default async () => {
  await seedCategories();
  return 'Seeded categories';
};
