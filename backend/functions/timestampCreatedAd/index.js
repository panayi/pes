import * as functions from 'firebase-functions';
import getCurrentEpoch from 'helpers/getCurrentEpoch';

export default functions.database.ref('/ads/{adId}').onCreate(event => {
  const snapshot = event.data;
  const ad = snapshot.val();

  // Skip legacy ad
  if (ad.isLegacy) {
    return null;
  }

  const now = getCurrentEpoch(event);

  return snapshot.ref.update({
    createdAt: now,
  });
});
