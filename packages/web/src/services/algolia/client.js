/* @flow */
import algoliasearch from 'algoliasearch/lite';
import env from '@pesposa/core/src/config/env';

export default algoliasearch(env.algoliaAppId, env.algoliaSearchKey);
