import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { withProps } from 'recompose';
import { connectData } from 'lib/connectData';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { models } from 'store/firebase/data';

const AD_KEY = '__ad___';
const AD_ID_KEY = '__adId___';
const AD_IMAGES_KEY = '__adImages___';

const hydrateAdSelector = createCachedSelector(
  propSelector(AD_KEY),
  propSelector(AD_ID_KEY),
  propSelector(AD_IMAGES_KEY),
  (ad, id, images) => R.merge(ad, { id, images }),
)(propSelector(AD_ID_KEY));

const hydrateAd = (adIdSelector, legacySelector = R.F) =>
  R.compose(
    connectData(
      {
        [AD_KEY]: models.ads(legacySelector).one(adIdSelector),
        [AD_IMAGES_KEY]: models.adImages(adIdSelector).allObjects,
      },
      createStructuredSelector({
        [AD_ID_KEY]: adIdSelector,
      }),
    ),
    withProps(
      createStructuredSelector({
        ad: hydrateAdSelector,
      }),
    ),
  );

export default hydrateAd;
