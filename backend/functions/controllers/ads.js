import * as functions from 'firebase-functions';
import * as algoliaService from 'services/algolia';

const handleAdCreatedOrUpdated = async event => {
  const ad = event.data.val();
  const { adId } = event.params;

  return algoliaService.add(ad, adId);
};

const handleAdDeleted = async event => {
  const { adId } = event.params;
  return algoliaService.remove(adId);
};

export const adCreated = functions.database
  .ref('/ads/published/{adId}')
  .onCreate(handleAdCreatedOrUpdated);
export const adUpdated = functions.database
  .ref('/ads/published/{adId}')
  .onUpdate(handleAdCreatedOrUpdated);
export const adDeleted = functions.database
  .ref('/ads/published/{adId}')
  .onDelete(handleAdDeleted);
