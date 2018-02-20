import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { algolia as algoliaConfig } from 'pesposa-config';
import algolia from 'lib/algoliaClient';
import computedProp from 'utils/computedProp';
import log from 'utils/log';

const adsIndexName = algoliaConfig.ADS_INDEXES.default;

// FIXME[legacy]: This is only needed for legacy ads
// Should remove/refactor later
const MAX_BODY_LENGTH = 1500;

const serializeAd = (ad, id) =>
  R.compose(
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
      'sold',
      'images',
      'createdAt',
      'location',
      'legacy',
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
          R.converge(
            R.compose(R.zipObj(['lat', 'lng']), R.unapply(R.identity)),
            [
              R.path(['location', 'geoposition', 'latitude']),
              R.path(['location', 'geoposition', 'longitude']),
            ],
          ),
        ),
      ),
    ),
    computedProp('legacy', R.propOr(false, 'legacy')),
    computedProp('sold', R.propOr(false, 'sold')),
    computedProp(algoliaConfig.ID, R.always(id)),
  )(ad);

const getIndex = () => algolia.initIndex(adsIndexName);

export const addMany = async ads => {
  try {
    const index = getIndex();
    const serializeAds = R.map(ad => serializeAd(ad, ad.id), ads);
    await index.saveObjects(serializeAds);
    log.info('Multiple ads created/updated in Algolia');
    return serializeAds;
  } catch (error) {
    log.error('Failed to create/update multiple ads in Algolia, with error:');
    log.error(error);
    throw error;
  }
};

export const add = async (ad, id) => {
  try {
    const index = getIndex();
    const serializedAd = serializeAd(ad, id);
    await index.saveObject(serializedAd);
    log.info(`Ad with id=${id} created or updated in Algolia`);
    return serializedAd;
  } catch (error) {
    log.error(
      `Failed to create/update ad with id=${id} in Algolia, with error:`,
    );
    log.error(error);
    throw error;
  }
};

export const update = async (props, id) => {
  try {
    const index = getIndex();
    // Ensure the object exists
    await index.getObject(id);
    const serializedProps = serializeAd(props, id);
    await index.partialUpdateObject(serializedProps);
    return serializedProps;
  } catch (error) {
    log.error(`Failed to update ad with id=${id} in Algolia, with error:`);
    log.error(error);
    throw error;
  }
};

export const remove = async id => {
  try {
    const index = getIndex();
    await index.deleteObject(id);
  } catch (error) {
    log.error(`Failed to delete ad with id=${id} in Algolia, with error:`);
    log.error(error);
    throw error;
  }
};
