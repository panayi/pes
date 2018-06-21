import env from '@pesposa/core/src/config/env';

export const getFirebaseConsoleUrl = path =>
  `https://console.firebase.google.com/u/0/project/${
    env.firebaseProject
  }/database/${env.firebaseProject}/data${path}`;
