import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { withProps } from 'recompose';
import { connectData } from 'lib/connectData';
import propSelector from 'utils/propSelector';
import { models } from 'store/data';

const AD_KEY = '__ad___';
const AD_ID_KEY = '__adId___';
const AD_IMAGES_KEY = '__adImages___';

const hydrateAd = createCachedSelector(
  propSelector(AD_KEY),
  propSelector(AD_ID_KEY),
  propSelector(AD_IMAGES_KEY),
  (ad, id, images) => R.merge(ad, { id, images }),
)(propSelector(AD_ID_KEY));

export default adIdSelector =>
  R.compose(
    connectData(
      {
        [AD_KEY]: models.ads.one(adIdSelector),
        [AD_IMAGES_KEY]: models.adImages(adIdSelector).all,
      },
      createStructuredSelector({
        [AD_ID_KEY]: adIdSelector,
      }),
    ),
    withProps(
      createStructuredSelector({
        ad: hydrateAd,
      }),
    ),
  );
