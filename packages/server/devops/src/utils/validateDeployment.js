import logger from 'winston-color';
import env from '@pesposa/core/src/config/env';

const validateDeployment = requestedProductionDeployment => {
  const { isProductionDeployment } = env;
  const requested = !!requestedProductionDeployment;
  const actual = !!isProductionDeployment;

  if (requested !== actual) {
    // Deployment mismatch
    if (requestedProductionDeployment) {
      logger.error(
        'You are attempting to run the command on <production>, but the current deployment is <development>.',
      );
      logger.info(
        'Run `yarn build:devops --production` to re-build devops for <production> deployment.',
      );
    } else {
      logger.error(
        'You are attempting to run the command on <development>, but the current deployment is <production>.',
      );
      logger.info(
        'Run `yarn build:devops` to re-build devops for <development> deployment',
      );
    }

    return false;
  }

  return true;
};

export default validateDeployment;
