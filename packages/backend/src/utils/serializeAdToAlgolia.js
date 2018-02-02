import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { algolia as algoliaConfig } from 'pesposa-config';
import computedProp from 'utils/computedProp';

// FIXME: This is only needed for legacy ads
// Should remove/refactor later
const MAX_BODY_LENGTH = 1500;

export default R.compose(
  R.evolve({
    body: str => str.substring(0, MAX_BODY_LENGTH),
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
    algoliaConfig.ID,
    'title',
    'body',
    'category',
    'price',
    'user',
    'images',
    'createdAt',
    'location',
    '_geoloc',
  ]),
  R.unless(
    R.propSatisfies(isNilOrEmpty, 'location'),
    R.compose(
      computedProp(
        'location',
        R.compose(R.omit(['geoposition']), R.prop('location')),
      ),
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
