import env from '@pesposa/core/src/config/env';

const rollbarConfig = {
  accessToken: env.rollbarToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: env.isProduction,
  payload: {
    environment: 'production',
    javascript: {
      source_map_enabled: true,
      code_version: env.gitSha,
    },
  },
};

export default rollbarConfig;
