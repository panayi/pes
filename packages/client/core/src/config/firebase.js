import * as storageConfig from '@pesposa/core/src/config/storage';
import env from '@pesposa/core/src/config/env';

const firebaseAppConfig = {
  apiKey: env.firebaseApiKey,
  authDomain: env.firebaseDomain,
  projectId: env.firebaseProject,
  databaseURL: env.firebaseDatabaseUrl,
  storageBucket: storageConfig.BUCKET,
};

export default firebaseAppConfig;
