import * as R from 'ramda';
import admin from 'firebase-admin';
import serviceAccountKey from './serviceAccountKey.json';

export default baseConfig => {
  const config = R.merge(baseConfig, {
    credential: admin.credential.cert(serviceAccountKey),
  });

  admin.initializeApp(config);

  return admin;
};
