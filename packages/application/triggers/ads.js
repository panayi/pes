/* @flow */
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

const handleAdUpdated = async (event: Event) => {
  const { adId } = event.params;
  const ad = (await adModel.get(adId)).val();
  return algoliaService.update(ad, adId);
};

const handleAdDeleted = async (event: Event) => {
  const { adId } = event.params;
  return algoliaService.remove(adId);
};

export const adUpdated = functions.database
  .ref('/ads/published/{adId}')
  .onUpdate(handleAdUpdated);

export const adDeleted = functions.database
  .ref('/ads/published/{adId}')
  .onDelete(handleAdDeleted);
