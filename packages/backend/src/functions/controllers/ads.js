/* @flow */
import * as functions from 'firebase-functions';
import * as algoliaService from 'services/algolia';

type Event = {
  params: {
    adId: ID,
  },
  // TODO: How to specify **what type of snapshot** should expect?
  // In other words, how to specify what val() returns?
  data: $npm$firebase$database$DataSnapshot,
};

const handleAdDeleted = async (event: Event) => {
  const { adId } = event.params;
  return algoliaService.remove(adId);
};

export const adDeleted = functions.database
  .ref('/ads/published/{adId}')
  .onDelete(handleAdDeleted);
