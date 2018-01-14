import * as R from 'ramda';

export default R.compose(
  R.evolve({
    body: str => str.substring(0, 1500),
    images: R.compose(
      R.filter(
        R.both(
          R.propSatisfies(R.is(String), 'fullPath'),
          R.propSatisfies(R.is(Object), 'dimensions'),
        ),
      ),
      R.map(
        R.compose(
          R.evolve({
            dimensions: R.pick(['width', 'height']),
          }),
          R.pick(['fullPath', 'dimensions']),
        ),
      ),
      R.defaultTo([]),
      R.values,
    ),
  }),
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
