/* eslint-disable no-console */

// ------------------------------------
// seeds.js
//
// To seed a new Firebase DB,
// run `yarn seed`
// ------------------------------------

import roles from '../seeds/roles.json';
import categories from '../seeds/categories.json';
import base from './common/firebase';

const seedRoles = async () => {
  const ref = base.ref('roles');
  await ref.set(roles);

  console.log('Seed: roles');
};

const seedCategories = async () => {
  const ref = base.ref('categories');
  await ref.set(categories);

  console.log('Seed: categories');
};

const main = async () => {
  await seedRoles();
  await seedCategories();

  base.goOffline();

  process.exit();
};

// Begin
main().catch(e => console.error(e));
