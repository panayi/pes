import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import id from '../utils/id';
import * as sellerTypes from '../config/sellerTypes';
import propSelector from '../utils/propSelector';

const AD_PROP_KEY = 'ad';
const AD_ID_PROP_KEY = 'adId';
const SELLER_PROP_KEY = 'seller';
const AVATAR_PROP_KEY = 'avatar';

const idSelector = createSelector(
  propSelector(AD_ID_PROP_KEY),
  propSelector(AD_PROP_KEY),
  R.useWith(R.or, [R.identity, id]),
);

const sellerImageSelector = createSelector(
  propSelector(AD_PROP_KEY),
  propSelector(AVATAR_PROP_KEY),
  (ad, avatar) => {
    if (isNilOrEmpty(ad)) {
      return null;
    }

    return ad.sellerType === sellerTypes.USER
      ? R.prop('originalUrl', avatar)
      : R.compose(
          R.prop('downloadURL'),
          R.head,
          R.values,
        )(avatar);
  },
);

const imagesSelector = createSelector(
  propSelector([AD_PROP_KEY, 'props', 'images']),
  propSelector([AD_PROP_KEY, 'internalProps', 'imageDimensions']),
  (images, dimensions) =>
    isNilOrEmpty(dimensions)
      ? images
      : R.mapObjIndexed(
          (image, imageId) =>
            R.merge(image, { dimensions: dimensions[imageId] }),
          images,
        ),
);

// Takes an ad that's returned from Firebase
// and transforms it to a format that matches Algolia objects
export const deserializeAdSelector = createCachedSelector(
  propSelector(AD_PROP_KEY),
  idSelector,
  imagesSelector,
  (ad, adId, images) =>
    R.mergeAll([
      ad,
      ad ? ad.internalProps : {},
      ad ? ad.props : {},
      {
        id: adId,
        images,
      },
    ]),
)(idSelector);

// In addition to deserialization,
// merges seller and sellerImage
export const hydrateAdSelector = createCachedSelector(
  deserializeAdSelector,
  propSelector(SELLER_PROP_KEY),
  sellerImageSelector,
  (ad, seller, sellerImage) =>
    R.mergeAll([
      ad,
      {
        sellerObject: seller,
        sellerImage,
      },
    ]),
)(idSelector);
