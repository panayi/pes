/* @flow */
import * as R from 'ramda';
import * as functions from 'firebase-functions';
import algoliaService from '@pesposa/core/src/services/algolia';
import * as adModel from '@pesposa/core/src/models/ad';

type Event = {
  params: {
    adId: ID,
  },
  // TODO: How to specify **what type of snapshot** should expect?
  // In other words, how to specify what val() returns?
  data: $npm$firebase$database$DataSnapshot,
};

const handleLegacyAdCreated = async (event: Event) => {
  const { adId } = event.params;
  const ad = (await adModel.get(adId)).val();
  const finalAd = R.merge(ad, { legacy: true });
  return algoliaService.update(finalAd, adId);
};

export const legacyAdCreated = functions.database
  .ref('/ads/legacy/{adId}')
  .onCreate(handleLegacyAdCreated);
