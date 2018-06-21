import * as R from 'ramda';
import { isNilOrEmpty, compact } from 'ramda-adjunct';
import algoliasearch from 'algoliasearch';
import env from '@pesposa/core/src/config/env';
import computedProp from '@pesposa/core/src/utils/computedProp';
import log from '@pesposa/core/src/utils/log';
import * as languageConfig from '@pesposa/core/src/config/language';
import * as algoliaConfig from '@pesposa/core/src/config/algolia';
import { deserializeAdSelector } from '@pesposa/core/src/selectors/ads';

export const client = algoliasearch(env.algoliaAppId, env.algoliaApiKey);
const adsIndexName = algoliaConfig.ADS_INDEXES.default;
export const initIndex = indexName => client.initIndex(indexName);

const serializeAd = (id, ad) =>
  R.compose(
    R.evolve({
      thumbnail: R.compose(
        R.evolve({
          dimensions: R.pick(['width', 'height']),
        }),
        R.pick(['fullPath', 'dimensions']),
      ),
    }),
    R.pick([
      algoliaConfig.ID,
      'title',
      'body',
      'convertedText',
      'category',
      'price',
      'seller',
      'sold',
      'thumbnail',
      'createdAt',
      'location',
      '_geoloc',
    ]),
    compact,
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
    R.unless(
      R.either(
        R.propSatisfies(isNilOrEmpty, 'title'),
        R.propSatisfies(isNilOrEmpty, 'body'),
      ),
      computedProp(
        'convertedText',
        R.converge(
          R.compose(
            languageConfig.convertGreek,
            R.join('. '),
            R.unapply(R.identity),
          ),
          [R.prop('title'), R.prop('body')],
        ),
      ),
    ),
    computedProp(algoliaConfig.ID, R.always(id)),
    adObject => deserializeAdSelector({ ad: adObject, adId: id }),
  )(ad);

export const addMany = async ads => {
  try {
    const index = initIndex(adsIndexName);
    const serializeAds = R.map(ad => serializeAd(ad.id, ad), ads);
    await index.saveObjects(serializeAds);
    log.info('Multiple ads created/updated in Algolia');
    return serializeAds;
  } catch (error) {
    log.error('Failed to create/update multiple ads in Algolia, with error:');
    log.error(error);
    return null;
  }
};

export const add = async (id, ad) => {
  try {
    const index = initIndex(adsIndexName);
    const serializedAd = serializeAd(id, ad);
    await index.saveObject(serializedAd);
    log.info(`Ad with id=${id} created or updated in Algolia`);
    return serializedAd;
  } catch (error) {
    log.error(
      `Failed to create/update ad with id=${id} in Algolia, with error:`,
    );
    log.error(error);
    return null;
  }
};

export const update = async (id, props) => {
  try {
    const index = initIndex(adsIndexName);
    // Ensure the object exists
    await index.getObject(id);
    const serializedProps = serializeAd(id, props);
    await index.partialUpdateObject(serializedProps);
    return serializedProps;
  } catch (error) {
    log.error(`Failed to update ad with id=${id} in Algolia, with error:`);
    log.error(error);
    return null;
  }
};

export const remove = async id => {
  try {
    const index = initIndex(adsIndexName);
    await index.deleteObject(id);
  } catch (error) {
    log.error(`Failed to delete ad with id=${id} in Algolia, with error:`);
    log.error(error);
  }
};
