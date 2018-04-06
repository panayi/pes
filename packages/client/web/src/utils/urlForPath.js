import * as R from 'ramda';
import env from '@pesposa/core/src/config/env';

const urlForPath = R.compose(
  path => `https://cy.${env.domain}${path}`,
  R.when(R.compose(R.not, R.equals('/'), R.head), R.concat('/')),
);

export default urlForPath;
