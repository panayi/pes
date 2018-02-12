/* @flow */
import algoliasearch from 'algoliasearch/lite';
import { env } from 'pesposa-config';

export default algoliasearch(env.algoliaAppId, env.algoliaSearchKey);
