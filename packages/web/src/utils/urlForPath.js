import * as R from 'ramda';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';

const urlForPath = R.compose(
  path => `https://${firebaseConfig.FIREBASE_DOMAIN}${path}`,
  R.when(R.compose(R.not, R.equals('/'), R.head), R.concat('/')),
);

export default urlForPath;
