import * as functions from 'firebase-functions';
import getCurrentEpoch from 'helpers/getCurrentEpoch';

export default functions.database.ref('/ads/{adId}').onCreate(event => {
  const now = getCurrentEpoch(event);
  const snapshot = event.data;

  return snapshot.ref.update({
    createdAt: now,
  });
});
