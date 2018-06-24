import * as R from 'ramda';
import * as functions from 'firebase-functions';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import server from '@pesposa/server-core/src/server';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import * as algoliaService from '@pesposa/server-core/src/services/algolia';

const handleAdPropsUpdated = async (change, context) => {
  const id = R.path(['params', 'id'], context);
  const { before } = change;
  const beforeAdProps = before.val();
  const finalAd = await server.ads.setInternalProps(firebase, id);
  const beforeAd = R.merge(finalAd, { props: beforeAdProps });

  // Create task to review the change
  if (finalAd.sellerType === sellerTypes.USER) {
    await server.reviewAdTasks.adWasUpdated(firebase, id, {
      beforeAd,
      afterAd: finalAd,
    });
  }

  // Update ad on algolia
  return algoliaService.update(id, finalAd);
};

const adPropsUpdated = functions.database
  .ref('/ads/{id}/props')
  .onUpdate(handleAdPropsUpdated);

export default adPropsUpdated;
