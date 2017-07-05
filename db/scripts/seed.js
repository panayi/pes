/* eslint-disable no-console */

// ------------------------------------
// seeds.js
//
// To seed a new Firebase DB,
// run `yarn seed`
// ------------------------------------

import categories from '../seeds/categories.json';
import base from './common/firebase';

const seedCategories = async () => {
  const ref = base.ref('categories');
  await ref.set(categories);

  console.log('Seeded categories');
};

const main = async () => {
  await seedCategories();

  base.goOffline();
};

// Begin
main().catch(e => console.error(e));
