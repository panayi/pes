/* @flow */
export type Env = {|
  REACT_APP_FIREBASE_API_KEY: string,
  REACT_APP_FIREBASE_PROJECT_ID: string,
  REACT_APP_FIREBASE_FUNCTIONS_BASE_URL: string,
  REACT_APP_ALGOLIA_APP_ID: string,
  REACT_APP_ALGOLIA_SEARCH_KEY: string,
  REACT_APP_IMGIX_HOST: string,
  REACT_APP_GOOGLE_APIS_KEY: string,
  GOOGLE_APIS_SERVER_KEY: ?string,
  ALGOLIA_API_KEY: ?string,
  LEGACY_PESPOSA_BASE_URL: ?string,
  LEGACY_PESPOSA_TOKEN: ?string,
|};

const env = ((process.env: any): Env);

const output = {
  firebaseApiKey: env.REACT_APP_FIREBASE_API_KEY,
  firebaseProjectId: env.REACT_APP_FIREBASE_PROJECT_ID,
  firebaseFunctionsBaseUrl: env.REACT_APP_FIREBASE_FUNCTIONS_BASE_URL,
  algoliaAppId: env.REACT_APP_FIREBASE_API_KEY,
  algoliaSearchKey: env.REACT_APP_ALGOLIA_SEARCH_KEY,
  imgixHost: env.REACT_APP_IMGIX_HOST,
  googleApisKey: env.REACT_APP_GOOGLE_APIS_KEY,
  googleApisServerKey: env.GOOGLE_APIS_SERVER_KEY,
  algoliaApiKey: env.ALGOLIA_API_KEY,
  legacyPesposaBaseUrl: env.LEGACY_PESPOSA_BASE_URL,
  legacyPesposaToken: env.LEGACY_PESPOSA_BASE_URL,
};

export default output;
