import * as R from 'ramda';
import createCachedSelector from 're-reselect';
import { propSelector } from 'pesposa-utils';
import id from 'utils/id';
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
