import * as R from 'ramda';

const output = {
  countrySites: R.compose(R.split(','), R.defaultTo(''))(
    process.env.RAZZLE_COUNTRY_SITES || process.env.REACT_APP_COUNTRY_SITES,
  ),
  firebaseApiKey:
    process.env.RAZZLE_FIREBASE_API_KEY ||
    process.env.REACT_APP_FIREBASE_API_KEY,
  firebaseProject:
    process.env.RAZZLE_FIREBASE_PROJECT ||
    process.env.REACT_APP_FIREBASE_PROJECT,
  firebaseDatabaseUrl:
    process.env.RAZZLE_FIREBASE_DATABASE_URL ||
    process.env.REACT_APP_FIREBASE_DATABASE_URL,
  firebaseDomain:
    process.env.RAZZLE_FIREBASE_DOMAIN || process.env.REACT_APP_FIREBASE_DOMAIN,
  firebaseFunctionsBaseUrl:
    process.env.RAZZLE_FIREBASE_FUNCTIONS_BASE_URL ||
    process.env.REACT_APP_FIREBASE_FUNCTIONS_BASE_URL,
  firebaseStorageBucket:
    process.env.RAZZLE_FIREBASE_STORAGE_BUCKET ||
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  domain: process.env.RAZZLE_DOMAIN || process.env.REACT_APP_DOMAIN,
  algoliaAppId:
    process.env.RAZZLE_ALGOLIA_APP_ID || process.env.REACT_APP_ALGOLIA_APP_ID,
  algoliaSearchKey:
    process.env.RAZZLE_ALGOLIA_SEARCH_KEY ||
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
  algoliaMaxBodyLength:
    process.env.RAZZLE_ALGOLIA_MAX_BODY_LENGTH ||
    process.env.REACT_APP_ALGOLIA_MAX_BODY_LENGTH,
  imgixHost: process.env.RAZZLE_IMGIX_HOST || process.env.REACT_APP_IMGIX_HOST,
  googleApisKey:
    process.env.RAZZLE_GOOGLE_APIS_KEY || process.env.REACT_APP_GOOGLE_APIS_KEY,
  mixpanelToken:
    process.env.RAZZLE_MIXPANEL_TOKEN || process.env.REACT_APP_MIXPANEL_TOKEN,
  rollbarToken:
    process.env.RAZZLE_ROLLBAR_TOKEN || process.env.REACT_APP_ROLLBAR_TOKEN,
  googleAnalyticsTrackingId:
    process.env.RAZZLE_GOOGLE_ANALYTICS_TRACKING_ID ||
    process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  internalEmailDomain: process.env.INTERNAL_EMAIL_DOMAIN,
  googleApisServerKey: process.env.GOOGLE_APIS_SERVER_KEY,
  algoliaApiKey: process.env.ALGOLIA_API_KEY,
  mailgunApiKey: process.env.MAILGUN_API_KEY,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
  zendeskToken: process.env.ZENDESK_TOKEN,
  zendeskUsername: process.env.ZENDESK_USERNAME,
  zendeskApiUrl: process.env.ZENDESK_API_URL,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default output;
