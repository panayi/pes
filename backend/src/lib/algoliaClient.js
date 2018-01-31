import algoliasearch from 'algoliasearch';

const APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;

// configure algolia
export default algoliasearch(APP_ID, process.env.ALGOLIA_API_KEY);

export { APP_ID };
