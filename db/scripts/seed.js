/* eslint-disable no-console */

// ------------------------------------
// seeds.js
//
// To seed a new Firebase DB,
// run `yarn seed`
// ------------------------------------

import roles from '../seeds/roles';
import categories from '../seeds/categories.json';
import firebase from './common/firebase';

const seedRoles = async () => {
  const ref = firebase.ref('roles');
  await ref.set(roles);

  console.log('Seed: roles');
};

const seedCategories = async () => {
  const ref = firebase.ref('categories');
  await ref.set(categories);

  console.log('Seed: categories');
};

const main = async () => {
  await seedRoles();
  await seedCategories();

  firebase.goOffline();

  process.exit();
};

// Begin
main().catch(e => console.error(e));
