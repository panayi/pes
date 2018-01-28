import * as functions from 'firebase-functions';
import * as algoliaService from 'services/algolia';
import * as adImageModel from '../models/adImage';

const syncAngolia = async adId => {
  const adImagesSnapshot = await adImageModel.getAll(adId);
  const adImages = adImagesSnapshot.val();
  return algoliaService.update({ images: adImages }, adId);
};

const handleCreate = async event => {
  const { adId } = event.params;
  await adImageModel.setDimensions(event.data);
  return syncAngolia(adId);
};

const handleDelete = async event => {
  const { adId } = event.params;
  return syncAngolia(adId);
};

export const adImageCreated = functions.database
  .ref('/ads/images/{adId}/{imageId}')
  .onCreate(handleCreate);
export const adImageDeleted = functions.database
  .ref('/ads/images/{adId}/{imageId}')
  .onDelete(handleDelete);
