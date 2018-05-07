import * as R from 'ramda';

const output = {
  countrySites: R.compose(R.split(','), R.defaultTo(''))(
    process.env.RAZZLE_COUNTRY_SITES,
  ),
  firebaseApiKey: process.env.RAZZLE_FIREBASE_API_KEY,
  firebaseProject: process.env.RAZZLE_FIREBASE_PROJECT,
  firebaseDatabaseUrl: process.env.RAZZLE_FIREBASE_DATABASE_URL,
  firebaseDomain: process.env.RAZZLE_FIREBASE_DOMAIN,
  firebaseFunctionsBaseUrl: process.env.RAZZLE_FIREBASE_FUNCTIONS_BASE_URL,
  firebaseStorageBucket: process.env.RAZZLE_FIREBASE_STORAGE_BUCKET,
  domain: process.env.RAZZLE_DOMAIN,
  algoliaAppId: process.env.RAZZLE_ALGOLIA_APP_ID,
  algoliaSearchKey: process.env.RAZZLE_ALGOLIA_SEARCH_KEY,
  imgixHost: process.env.RAZZLE_IMGIX_HOST,
  googleApisKey: process.env.RAZZLE_GOOGLE_APIS_KEY,
  mixpanelToken: process.env.RAZZLE_MIXPANEL_TOKEN,
  googleAnalyticsTrackingId: process.env.RAZZLE_GOOGLE_ANALYTICS_TRACKING_ID,
  googleApisServerKey: process.env.GOOGLE_APIS_SERVER_KEY,
  algoliaApiKey: process.env.ALGOLIA_API_KEY,
  mailgunApiKey: process.env.MAILGUN_API_KEY,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
  legacyPesposaBaseUrl: process.env.LEGACY_PESPOSA_BASE_URL,
  legacyPesposaToken: process.env.LEGACY_PESPOSA_TOKEN,
  betaEnabled: process.env.RAZZLE_BETA === 'true',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default output;
