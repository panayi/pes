import * as R from 'ramda';
import * as functions from 'firebase-functions';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import client from '@pesposa/core/src/client';
import server from '@pesposa/server-core/src/server';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import * as algoliaService from '@pesposa/server-core/src/services/algolia';

const handleAdCreated = async (snap, context) => {
  const id = R.path(['params', 'id'], context);

  // Get it again, since it may have changed in the meantime
  const adSnap = await client.ads.get(firebase, id);
  const ad = adSnap.val();
  const sellerId = ad.seller;

  const finalAd = await server.ads.setInternalProps(firebase, id);

  // Index the new ad on algolia
  await algoliaService.add(id, finalAd);

  if (finalAd.sellerType === sellerTypes.USER) {
    // Create a task to review the ad
    await server.reviewAdTasks.adWasCreated(firebase, id, finalAd);

    // Delete draft ad for user
    await client.drafts.remove(firebase, sellerId);
  } else if (finalAd.sellerType === sellerTypes.EXTERNAL_USER) {
    await server.convertExternalUserTasks.adWasCreated(firebase, id, finalAd);
  }
};

const adCreated = functions.database.ref('/ads/{id}').onCreate(handleAdCreated);

export default adCreated;
