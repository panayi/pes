import * as functions from 'firebase-functions';
import * as algoliaService from '@pesposa/core/src/services/algolia';
import * as adImageModel from '@pesposa/core/src/models/adImage';
import * as adModel from '@pesposa/core/src/models/ad';

const syncAngolia = async (adId) => {
  const adImagesSnapshot = await adImageModel.getAll(adId);
  const adImages = adImagesSnapshot.val();
  return algoliaService.update({ images: adImages }, adId);
};

const handleCreate = async (snap, context) => {
  const { adId } = context.params;
  await adImageModel.setDimensions(snap);
  return syncAngolia(adId);
};

const handleDelete = async (snap, context) => {
  const { adId } = context.params;
  const adSnapshot = await adModel.get(adId);

  await adImageModel.removeFile(snap.val());

  // If the ad doesn't exist, it was (or will be) deleted from Algolia anyway
  if (adSnapshot.exists()) {
    return syncAngolia(adId);
  }

  return null;
};

// TODO: How to type check the path, and ensure
// it matches the right pattern?
export const adImageCreated = functions.database
  .ref('/ads/images/{adId}/{imageId}')
  .onCreate(handleCreate);

  export const adImageDeleted = functions.database
  .ref('/ads/images/{adId}/{imageId}')
  .onDelete(handleDelete);
