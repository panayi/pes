/* @flow */
// export type Env = {|
//   REACT_APP_FIREBASE_API_KEY: string,
//   REACT_APP_FIREBASE_PROJECT_ID: string,
//   REACT_APP_FIREBASE_FUNCTIONS_BASE_URL: string,
//   REACT_APP_ALGOLIA_APP_ID: string,
//   REACT_APP_ALGOLIA_SEARCH_KEY: string,
//   REACT_APP_IMGIX_HOST: string,
//   REACT_APP_GOOGLE_APIS_KEY: string,
//   GOOGLE_APIS_SERVER_KEY: ?string,
//   ALGOLIA_API_KEY: ?string,
//   LEGACY_PESPOSA_BASE_URL: ?string,
//   LEGACY_PESPOSA_TOKEN: ?string,
// |};

// const env = ((process.env: any): Env);

const output = {
  firebaseApiKey: process.env.RAZZLE_FIREBASE_API_KEY,
  firebaseProject: process.env.RAZZLE_FIREBASE_PROJECT,
  firebaseDatabaseUrl: process.env.RAZZLE_FIREBASE_DATABASE_URL,
  firebaseDomain: process.env.RAZZLE_FIREBASE_DOMAIN,
  firebaseFunctionsBaseUrl: process.env.RAZZLE_FIREBASE_FUNCTIONS_BASE_URL,
  firebaseStorageBucket: process.env.RAZZLE_FIREBASE_STORAGE_BUCKET,
  algoliaAppId: process.env.RAZZLE_ALGOLIA_APP_ID,
  algoliaSearchKey: process.env.RAZZLE_ALGOLIA_SEARCH_KEY,
  imgixHost: process.env.RAZZLE_IMGIX_HOST,
  googleApisKey: process.env.RAZZLE_GOOGLE_APIS_KEY,
  googleApisServerKey: process.env.GOOGLE_APIS_SERVER_KEY,
  algoliaApiKey: process.env.ALGOLIA_API_KEY,
  legacyPesposaBaseUrl: process.env.LEGACY_PESPOSA_BASE_URL,
  legacyPesposaToken: process.env.LEGACY_PESPOSA_TOKEN,
  betaEnabled: process.env.RAZZLE_BETA === 'true',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default output;
