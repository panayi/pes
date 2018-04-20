import * as R from 'ramda';
import * as functions from 'firebase-functions';
import * as algoliaService from '@pesposa/core/src/services/algolia';
import * as adModel from '@pesposa/core/src/models/ad';
import * as adImageModel from '@pesposa/core/src/models/adImage';

const handleAdUpdated = async (change, context) => {
  const { adId } = context.params;
  const ad = (await adModel.get(adId)).val();
  return algoliaService.update(ad, adId);
};

const handleAdDeleted = async (snap, context) => {
  const { adId } = context.params;
  const adImagesSnapshot = await adImageModel.getAll(adId);

  if (adImagesSnapshot.exists()) {
    const adImages = R.values(adImagesSnapshot.val());
    await Promise.all(R.map(adImageModel.removeFile, adImages));
  }

  await adImageModel.removeAll(adId);

  return algoliaService.remove(adId);
};

export const adUpdated = functions.database
  .ref('/ads/published/{adId}')
  .onUpdate(handleAdUpdated);

export const adDeleted = functions.database
  .ref('/ads/published/{adId}')
  .onDelete(handleAdDeleted);

export const legacyAdDeleted = functions.database
  .ref('/ads/legacy/{adId}')
  .onDelete(handleAdDeleted);
