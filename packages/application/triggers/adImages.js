/* @flow */
import * as functions from 'firebase-functions';
import * as algoliaService from '@pesposa/core/src/services/algolia';
import * as adImageModel from '@pesposa/core/src/models/adImage';
import * as adModel from '@pesposa/core/src/models/ad';

type Event = {
  params: {
    adId: ID,
  },
  // TODO: How to specify **what type of snapshot** should expect?
  // In other words, how to specify what val() returns?
  data: $npm$firebase$database$DataSnapshot,
};

const syncAngolia = async (adId: string) => {
  const adImagesSnapshot = await adImageModel.getAll(adId);
  const adImages: Array<Image> = adImagesSnapshot.val();
  return algoliaService.update({ images: adImages }, adId);
};

const handleCreate = async (event: Event) => {
  const { adId } = event.params;
  await adImageModel.setDimensions(event.data);
  return syncAngolia(adId);
};

const handleDelete = async (event: Event) => {
  const { adId } = event.params;
  const adSnapshot = await adModel.get(adId);

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
