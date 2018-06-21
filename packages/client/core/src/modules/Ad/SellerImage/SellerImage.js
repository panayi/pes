import * as R from 'ramda';
import { branch, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import hydrateAd from '../hydrateAd';

export default R.compose(
  branch(
    R.complement(propSelector(['ad', 'hydrated'])),
    hydrateAd(propSelector(['adId'])),
  ),
  withProps(
    createStructuredSelector({
      src: propSelector(['ad', 'sellerImage']),
      loaded: propSelector(['ad', 'isLoaded', 'seller']),
    }),
  ),
)(ProfileImage);
