import * as R from 'ramda';

export default R.compose(
  R.unless(
    R.has('createdAt'),
    post => R.assoc('createdAt', (new Date()).getTime(), post),
  ),
  R.over(
    R.lensProp('body'),
    R.compose(
      str => str.substring(0, 1500),
      R.defaultTo(''),
    ),
  ),
  R.over(
    R.lensProp('images'),
    R.compose(
      R.filter(R.identity),
      R.pluck('downloadURL'),
      R.defaultTo([]),
      R.values,
      R.defaultTo({}),
    ),
  ),
  R.pick([
    'objectID',
    'title',
    'body',
    'category',
    'categoryChild',
    'price',
    'images',
    'address',
    'createdAt',
  ]),
);
