import * as R from 'ramda';
import createCachedSelector from 're-reselect';
import { isNilOrEmpty } from 'ramda-adjunct';
import propSelector from 'utils/propSelector';
import propOrSelector from 'utils/propOrSelector';
import id from 'utils/id';
import { buildUrl } from 'services/imgix';
import * as utils from './utils';

// adIdSelector :: Props -> String
const adIdSelector = R.compose(id, propSelector('ad'));

// adImagesSelector :: Props -> [String]
const adImagesSelector = createCachedSelector(
  propSelector('ad'),
  utils.getAdImages,
)(adIdSelector);

// adFirstImageSelector :: Props -> String | Nil
export const adFirstImageSelector = R.compose(R.head, adImagesSelector);

// adDefaultImageSelector :: Props -> { Url, Height }
//   Url = String
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

// adThumbnailWithDefaultSelector :: Props -> Image
const adThumbnailWithDefaultSelector = createCachedSelector(
  adFirstImageSelector,
  adDefaultImageSelector,
  propOrSelector({}, 'imgixParams'),
  (firstImage, defaultImage, imgixParams) => {
    if (isNilOrEmpty(firstImage)) {
      return defaultImage;
    }

    const { fullPath, dimensions } = firstImage;
    let height;

    if (!isNilOrEmpty(imgixParams.h)) {
      height = imgixParams.h;
    } else if (!isNilOrEmpty(imgixParams.w)) {
      height = imgixParams.w / dimensions.width * dimensions.height;
    } else {
      height = dimensions.height;
    }

    return {
      url: buildUrl(fullPath, imgixParams),
      height,
    };
  },
)(adIdSelector);

export { adThumbnailWithDefaultSelector };
