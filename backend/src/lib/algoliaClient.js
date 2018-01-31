import algoliasearch from 'algoliasearch';

const appId = process.env.REACT_APP_ALGOLIA_APP_ID;

// configure algolia
export default algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY,
);

export { appId };
