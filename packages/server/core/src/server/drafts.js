import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import client from '@pesposa/core/src/client';

export const move = async (firebase, sourceUserId, targetUserId) => {
  const sourceSnapshot = await client.drafts.get(firebase, sourceUserId);

  if (R.isNil(sourceSnapshot)) {
    return null;
  }

  const sourceDraftAd = sourceSnapshot.val();
  const isSourceDraftAdEmtpy = R.compose(
    R.all(isNilOrEmpty),
    R.values,
  )(sourceDraftAd);

  if (isSourceDraftAdEmtpy) {
    return null;
  }

  await client.drafts.set(firebase, sourceDraftAd, targetUserId);
  return client.drafts.remove(firebase, sourceUserId);
};
