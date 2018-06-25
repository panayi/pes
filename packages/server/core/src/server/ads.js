import * as R from 'ramda';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import client from '@pesposa/core/src/client';
import getImageDimensions from '../utils/getImageDimensions';

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const setInternalProps = async (firebase, id) => {
  const adSnap = await client.ads.get(firebase, id);

  if (!adSnap.exists()) {
    return null;
  }

  const ad = adSnap.val();
  const { seller } = ad;

  // Set dimensions of images
  const snap = await firebase
    .ref(`/${modelPaths.ADS.string}/${id}/props/images`)
    .orderByChild('dimensions')
    .equalTo(null)
    .once('value');
  const updates = {};
  const promises = [];
  snap.forEach(async imageSnap => {
    const { key } = imageSnap;
    const image = imageSnap.val();
    const promise = getImageDimensions(image.downloadURL);
    promises.push(promise);
    const dimensions = await promise;
    updates[
      `/${modelPaths.ADS.string}/${id}/internalProps/imageDimensions/${key}`
    ] = dimensions;
    updates[
      `/${
        modelPaths.SELLER_ADS(seller).string
      }/${id}/internalProps/imageDimensions/${key}`
    ] = dimensions;
  });
  await Promise.all(promises);
  await firebase.update('/', updates);

  // Set thumbnail
  const imagesSnap = await firebase
    .ref(`/${modelPaths.ADS.string}/${id}/props/images`)
    .once('value');
  const imageDimensionsSnap = await firebase
    .ref(`/${modelPaths.ADS.string}/${id}/internalProps/imageDimensions`)
    .once('value');
  if (imagesSnap.exists()) {
    const firstImage = R.compose(
      R.head,
      R.values,
    )(imagesSnap.val());
    const firstImageKey = R.compose(
      R.head,
      R.keys,
    )(imagesSnap.val());
    const thumbnail = R.merge(firstImage, {
      dimensions: imageDimensionsSnap.val()[firstImageKey],
    });
    await firebase.update('/', {
      [`/${modelPaths.ADS.string}/${id}/internalProps/thumbnail`]: thumbnail,
      [`/${
        modelPaths.SELLER_ADS(seller).string
      }/${id}/internalProps/thumbnail`]: thumbnail,
    });
  }

  const processedAdSnap = await client.ads.get(firebase, id);
  return processedAdSnap.val();
};
