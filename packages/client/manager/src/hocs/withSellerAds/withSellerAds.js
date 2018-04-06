import * as R from 'ramda';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propOrSelector from '@pesposa/core/src/utils/propOrSelector';
import * as adStatuses from '@pesposa/core/src/config/adStatuses';
import { deserializeAdSelector } from '@pesposa/core/src/selectors/ads';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';

const SELLER_ID_KEY = '___seller__id';

const mapDataToProps = {
  publishedAds: models.sellerAds(propSelector(SELLER_ID_KEY)).all,
  rejectedAds: models.sellerAds(
    propSelector('seller'),
    R.always(adStatuses.REJECTED),
  ).all,
  deletedAds: models.sellerAds(
    propSelector('seller'),
    R.always(adStatuses.DELETED),
  ).all,
};

const adsSelector = createSelector(
  propOrSelector([], 'publishedAds'),
  propOrSelector([], 'rejectedAds'),
  propOrSelector([], 'deletedAds'),
  propSelector('reviewAdId'),
  (publishedAds, rejectedAds, deletedAds, reviewAdId) =>
    R.compose(
      R.reject(R.propEq('id', reviewAdId)),
      R.map(ad => deserializeAdSelector({ ad })),
      R.flatten,
      R.of,
      R.map(([status, ads]) => R.map(R.assoc('status', status), ads)),
      R.toPairs,
      R.zipObj([adStatuses.PUBLISHED, adStatuses.REJECTED, adStatuses.DELETED]),
      R.unapply(R.identity),
    )(publishedAds, rejectedAds, deletedAds),
);

const withSellerAds = sellerIdSelector =>
  R.compose(
    withProps(
      createStructuredSelector({
        [SELLER_ID_KEY]: sellerIdSelector,
      }),
    ),
    connectData(mapDataToProps),
    withProps(
      createStructuredSelector({
        ads: adsSelector,
      }),
    ),
  );

export default withSellerAds;
