import * as R from 'ramda';
import createCachedSelector from 're-reselect';
import { isNilOrEmpty } from 'ramda-adjunct';
import { propSelector, propOrSelector, id } from 'pesposa-core/utils';
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

// adThumbnailSelector :: Props -> Image
const adThumbnailSelector = createCachedSelector(
  adFirstImageSelector,
  propOrSelector({}, 'imgixParams'),
  (firstImage, imgixParams) => {
    if (isNilOrEmpty(firstImage)) {
      return null;
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

export { adThumbnailSelector };
