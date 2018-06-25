import * as R from 'ramda';

const firebaseProject = process.env.REACT_APP_FIREBASE_PROJECT;
const app = process.env.REACT_APP_APP;

const output = {
  maintenance: process.env.MAINTENANCE === 'true',
  countrySites: R.compose(
    R.split(','),
    R.defaultTo(''),
  )(process.env.REACT_APP_COUNTRY_SITES),
  firebaseApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  firebaseProject,
  firebaseDatabaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  firebaseDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  firebaseFunctionsBaseUrl: process.env.REACT_APP_FIREBASE_FUNCTIONS_BASE_URL,
  firebaseStorageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  domain: process.env.REACT_APP_DOMAIN,
  algoliaAppId: process.env.REACT_APP_ALGOLIA_APP_ID,
  algoliaSearchKey: process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
  algoliaMaxBodyLength: process.env.REACT_APP_ALGOLIA_MAX_BODY_LENGTH,
  imgixHost: process.env.REACT_APP_IMGIX_HOST,
  googleApisKey: process.env.REACT_APP_GOOGLE_APIS_KEY,
  mixpanelToken: process.env.REACT_APP_MIXPANEL_TOKEN,
  rollbarToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  googleAnalyticsTrackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  internalEmailDomain: process.env.INTERNAL_EMAIL_DOMAIN,
  googleApisServerKey: process.env.GOOGLE_APIS_SERVER_KEY,
  algoliaApiKey: process.env.ALGOLIA_API_KEY,
  mailgunApiKey: process.env.MAILGUN_API_KEY,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
  zendeskToken: process.env.ZENDESK_TOKEN,
  zendeskUsername: process.env.ZENDESK_USERNAME,
  zendeskApiUrl: process.env.ZENDESK_API_URL,
  app,
  isManagerApp: app === 'manager',
  isWebApp: app === 'web',
  isProductionDeployment: firebaseProject === 'pesposa-production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default output;
