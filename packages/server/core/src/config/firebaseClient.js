import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import 'firebase-functions';
import * as admin from 'firebase-admin';
import { createFirebaseInstance, constants } from 'react-redux-firebase';
import env from '@pesposa/core/src/config/env';
import apps from '@pesposa/core/src/config/apps';
import serviceAccountKey from '@pesposa/core/src/config/serviceAccountKey.json';

const appObject = R.compose(
  R.find(R.propEq('name', env.app)),
  R.values,
)(apps);

const createFirebaseClient = baseConfig => {
  const config = R.merge(baseConfig, {
    credential: admin.credential.cert(serviceAccountKey),
    databaseAuthVariableOverride: {
      uid: appObject.uid,
    },
  });

  try {
    admin.initializeApp(config);
  } catch (e) {
    // The admin SDK can only be initialized once
  }

  return admin;
};

const firebaseConfig = {
  databaseURL: env.firebaseDatabaseUrl,
};

const firebaseClient = createFirebaseClient(firebaseConfig);
const firebaseInstance = createFirebaseInstance(
  firebaseClient,
  constants.defaultConfig,
  noop,
);

export default firebaseInstance;
