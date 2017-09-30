import algoliasearch from 'algoliasearch';

// configure algolia
export default algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
