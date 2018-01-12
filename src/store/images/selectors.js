import * as R from 'ramda';
import createCachedSelector from 're-reselect';
import { isNilOrEmpty } from 'ramda-adjunct';
import propSelector from 'utils/propSelector';
import id from 'utils/id';
import { buildUrl } from 'services/imgix';
import * as utils from './utils';

// adIdSelector :: Props -> String
const adIdSelector = R.compose(id, propSelector('ad'));

// adImagePathsSelector :: Props -> [String]
const adImagePathsSelector = createCachedSelector(
  propSelector('ad'),
  utils.getAdImagesPaths,
)(adIdSelector);

// adFirstImageSelector :: Props -> String | Nil
export const adFirstImagePathSelector = R.compose(R.head, adImagePathsSelector);

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

// adFirstImageWithDefaultSelector :: Props -> Image
const adFirstImageWithDefaultSelector = createCachedSelector(
  adFirstImagePathSelector,
  adDefaultImageSelector,
  R.compose(R.defaultTo({}), propSelector('imageOptions')),
  (firstImagePath, defaultImage, imageOptions) => {
    if (isNilOrEmpty(firstImagePath)) {
      return defaultImage;
    }

    return {
      url: buildUrl(firstImagePath, imageOptions),
      height: imageOptions.h,
    };
  },
)(adIdSelector);

export { adFirstImageWithDefaultSelector };
