import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import computedProp from 'utils/computedProp';

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
    'price',
    'images',
    'createdAt',
    'location',
    '_geoloc',
  ]),
  R.unless(
    R.propSatisfies(isNilOrEmpty, 'location'),
    R.compose(
      computedProp('location', R.omit(['geoposition'])),
      computedProp(
        '_geoloc',
        R.converge(R.compose(R.zipObj(['lat', 'lng']), R.unapply(R.identity)), [
          R.path(['location', 'geoposition', 'latitude']),
          R.path(['location', 'geoposition', 'longitude']),
        ]),
      ),
    ),
  ),
);
