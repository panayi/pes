import algoliasearch from 'algoliasearch';

// configure algolia
export default algoliasearch(process.env.REACT_ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
