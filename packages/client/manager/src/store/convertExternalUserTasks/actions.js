import * as convertExternalUserTasks from '@pesposa/core/src/client/convertExternalUserTasks';

export const createEngagement = (externalUserId, channel, content) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const engagement = {
    channel,
    content,
  };

  return convertExternalUserTasks.createEngagement(
    getFirebase(),
    externalUserId,
    engagement,
  );
};

export const archive = externalUserId => (dispatch, getState, getFirebase) =>
  convertExternalUserTasks.archive(getFirebase(), externalUserId);

export const sendEmail = (externalUserId, adId) => (
  dispatch,
  getState,
  getFirebase,
) => convertExternalUserTasks.sendEmail(getFirebase(), externalUserId, adId);
