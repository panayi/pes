import * as R from 'ramda';
import { branch, mapProps, withRenderProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import hydrateAd from '../hydrateAd';

const SellerName = withRenderProps(
  R.compose(
    branch(
      R.complement(propSelector(['ad', 'hydrated'])),
      hydrateAd(propSelector(['adId'])),
    ),
    mapProps(
      createStructuredSelector({
        name: propSelector(['ad', 'sellerObject', 'name']),
        children: propSelector(['children']),
      }),
    ),
  ),
);

export default SellerName;
