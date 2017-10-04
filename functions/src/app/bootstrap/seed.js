/* eslint-disable no-console */
import { database } from '../../lib/firebase';
import roles from '../../lib/seeds/roles';
import categories from '../../lib/seeds/categories.json';

const seedRoles = async () => {
  const ref = database.ref('roles');
  await ref.set(roles);

  console.log('Seed: roles');
};

const seedCategories = async () => {
  const ref = database.ref('categories');
  await ref.set(categories);

  console.log('Seed: categories');
};

export default async (req, res) => {
  await seedRoles();
  await seedCategories();

  res.send('Done');
};
