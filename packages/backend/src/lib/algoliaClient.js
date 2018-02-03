/* @flow */
import algoliasearch from 'algoliasearch';
import { env } from 'pesposa-config';

export default algoliasearch(env.algoliaAppId, env.algoliaApiKey);
