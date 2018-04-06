import * as modelPaths from '../config/modelPaths';

export const create = (firebase, data) =>
  firebase.push(modelPaths.SUPPORT_MESSAGES.string, data);
