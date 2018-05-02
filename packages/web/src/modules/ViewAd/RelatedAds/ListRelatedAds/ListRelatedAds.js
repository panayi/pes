import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import renderNothingWhen from 'hocs/renderNothingWhen';
import ListAds from 'components/ListAds/ListAds';
import Search from 'modules/Search/Search';

const ListRelatedAds = ({ ad, adId }) => (
  <Search
    params={{
      sortBy: 'default',
      category: ad.category,
      rawProps: {
        query: ad.title,
        optionalWords: R.split(' ', ad.title),
        hitsPerPage: 10,
        filters: `NOT objectID:${adId}`,
      },
    }}
  >
    {props => <ListAds {...props} sidebarWidth={0} />}
  </Search>
);

export default renderNothingWhen(
  R.compose(isNilOrEmpty, R.path(['ad', 'title'])),
)(ListRelatedAds);
