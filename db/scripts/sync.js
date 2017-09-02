/* eslint-disable no-console */
/* global fetch */
import R from 'ramda';
import base from './common/firebase';

require('es6-promise').polyfill();
require('isomorphic-fetch');

// ------------------------------------
// Constants
// ------------------------------------
// const ALL_USERS_ENDPOINT = 'http://real-estate.pesposa.com/user/json/1231029fuisdhf849'
const ALL_POSTS_ENDPOINT = 'http://real-estate.pesposa.com/post/json/19ajaisjo90323jio';

// ------------------------------------
// Helpers
// ------------------------------------
const computedProp = R.curry((key, computer, obj) => R.converge(R.assoc(key), [
  computer,
  R.identity,
])(obj));

// Maps old post attributes (MySQL DB) to new post attributes (Graphcool)
const mapPost = R.compose(
  R.pick([
    'address',
    'body',
    'categoryChild',
    'category',
    'email',
    'images',
    'oldId',
    'permalink',
    'phone',
    'posterId',
    'title',
  ]),
  computedProp('images', R.compose(
    R.map(file => `http://cdn.pesposa.com/data/images/${file}`),
    R.split(';'),
    R.defaultTo(''),
    R.prop('images'),
  )),
  computedProp('posterId', R.compose(
    R.head,
    R.split(' '),
    R.trim,
    R.defaultTo(''),
    R.prop('user'),
  )),
  computedProp('address', ({ level4, level3 }) => `${level4} ${level3}`),
  computedProp('oldId', R.prop('id')),
  computedProp('body', R.prop('description')),
  computedProp('category', R.prop('categoryParent')),
);

const syncPosts = async () => {
  const postsResult = await fetch(ALL_POSTS_ENDPOINT);
  const postsJson = await postsResult.json();
  const finalPosts = R.map(mapPost, postsJson);

  const ref = base.ref('posts');
  await ref.set(finalPosts);

  console.log('Posts: synced');
};

const main = async () => {
  await syncPosts();
};

// Begin
main().catch(e => console.error(e));
