import * as R from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { withProps, branch } from 'recompose';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { hydrateAdSelector } from '@pesposa/core/src/selectors/ads';
import omitProps from '../../../utils/omitProps';
import { connectData } from '../../../lib/connectData';
import { models } from '../../../store/firebase/data';

const AD_PROP_KEY = '__ad__';
const AD_ID_PROP_KEY = '__adId__';
const SELLER_PROP_KEY = '__seller__';
const AVATAR_PROP_KEY = '__avatar__';

const adSelector = createCachedSelector(
  R.compose(
    hydrateAdSelector,
    renameKeys({
      [AD_PROP_KEY]: 'ad',
      [AD_ID_PROP_KEY]: 'adId',
      [SELLER_PROP_KEY]: 'seller',
      [AVATAR_PROP_KEY]: 'avatar',
    }),
  ),
  propSelector('isAdLoaded'),
  propSelector('isLoaded'),
  (ad, isAdLoaded, isLoaded) => {
    const finalIsLoaded = {
      ad: isAdLoaded,
      seller: isLoaded[SELLER_PROP_KEY],
    };
    return R.merge(ad, {
      isLoaded: finalIsLoaded,
      hydrated: true,
    });
  },
)(propSelector(AD_ID_PROP_KEY));

const hydrateAd = (adIdSelector, existingAdSelector = R.always(null)) =>
  R.compose(
    branch(
      existingAdSelector,
      withProps(
        createStructuredSelector({
          [AD_PROP_KEY]: existingAdSelector,
          [AD_ID_PROP_KEY]: adIdSelector,
          isAdLoaded: R.T,
        }),
      ),
      R.compose(
        connectData({
          [AD_PROP_KEY]: models.ads.one(adIdSelector),
        }),
        withProps(
          createStructuredSelector({
            [AD_ID_PROP_KEY]: adIdSelector,
            isAdLoaded: propSelector(['isLoaded', AD_PROP_KEY]),
          }),
        ),
      ),
    ),
    branch(
      propSelector([AD_PROP_KEY]),
      connectData({
        [SELLER_PROP_KEY]: models.profiles(
          propSelector([AD_PROP_KEY, 'seller']),
          propSelector([AD_PROP_KEY, 'sellerType']),
        ),
        [AVATAR_PROP_KEY]: models.avatars(
          propSelector([AD_PROP_KEY, 'seller']),
          propSelector([AD_PROP_KEY, 'sellerType']),
        ),
      }),
    ),
    withProps(
      createStructuredSelector({
        ad: adSelector,
      }),
    ),
    omitProps([AD_PROP_KEY, AD_ID_PROP_KEY, SELLER_PROP_KEY, AVATAR_PROP_KEY]),
  );

export default hydrateAd;
