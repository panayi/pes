/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import { withProps } from 'recompose';
import id from 'utils/id';
import theme from 'config/theme';
import Masonry from 'components/atoms/Masonry';
import AdCard from 'components/molecules/AdCard';
import FetchAdsProgress from 'components/molecules/FetchAdsProgress';
import { sizesSelector } from './utils';

type Props = {
  hits: Array<Ad>,
  refine: Function,
  hasMore: Boolean,
  sizes: Array<Object>,
};

const COLUMN_WIDTH = 230;
const GUTTER = 10;

export class ListAds extends Component<Props> {
  static defaultProps = {
    hits: [],
  };

  render() {
    const { hits, hasMore, refine, sizes } = this.props;

    return (
      <div>
        <Masonry
          getItemKey={id}
          items={hits}
          itemComponent={props => <AdCard {...props} ad={props.item} />}
          width={COLUMN_WIDTH}
          hasMore={hasMore}
          loadMore={refine}
          sizes={sizes}
          initialLoad={false}
        />
        <FetchAdsProgress hasMore={hasMore} />
      </div>
    );
  }
}

export default R.compose(
  connectInfiniteHits,
  withProps({
    sizes: sizesSelector({
      columnWidth: COLUMN_WIDTH,
      gutter: GUTTER,
      maxScreenWidth: 5000,
      wastedWidth: theme.layout.sidebarWidth + 2 * GUTTER,
    }),
  }),
)(ListAds);
