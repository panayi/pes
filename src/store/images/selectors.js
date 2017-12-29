import * as R from 'ramda';
import createCachedSelector from 're-reselect';
import propSelector from 'utils/propSelector';
import id from 'utils/id';
import * as utils from './utils';
import * as constants from './constants';

// adIdSelector :: Props -> String
const adIdSelector = R.compose(id, propSelector('ad'));

// adImagesSelector :: Props -> [Url]
//   Url = String
const adImagesSelector = createCachedSelector(
  propSelector('ad'),
  utils.getAdImages,
)(adIdSelector);

// adFirstImageSelector :: Props -> Url | Nil
export const adFirstImageSelector = createCachedSelector(
  adImagesSelector,
  R.head,
)(adIdSelector);

// adDefaultImageSelector :: Props -> Image
//   Image = { Url, Height }
//   Height = Number
const adDefaultImageSelector = createCachedSelector(
  adIdSelector,
  R.compose(
    ({ width, height }) => ({
      url: `https://unsplash.it/${width}/${height}/?random`,
      height,
    }),
    utils.getRandomDimensions,
  ),
)(adIdSelector);

// adFirstImageWithDefaultSelector :: Props -> Image
const adFirstImageWithDefaultSelector = createCachedSelector(
  adFirstImageSelector,
  adDefaultImageSelector,
  R.compose(
    R.defaultTo(constants.DEFAULT_IMAGE_HEIGHT),
    propSelector('defaultHeight'),
  ),
  (firstImage, defaultImage, defaultHeight) => {
    const image = firstImage || defaultImage;

    if (R.is(Object, image)) {
      return image;
    }

    return {
      url: image,
      height: defaultHeight,
    };
  },
)(adIdSelector);

export { adImagesSelector, adFirstImageWithDefaultSelector };
