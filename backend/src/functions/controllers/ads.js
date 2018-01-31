import * as functions from 'firebase-functions';
import * as algoliaService from 'services/algolia';

const handleAdDeleted = async event => {
  const { adId } = event.params;
  return algoliaService.remove(adId);
};

export const adDeleted = functions.database
  .ref('/ads/published/{adId}')
  .onDelete(handleAdDeleted);
