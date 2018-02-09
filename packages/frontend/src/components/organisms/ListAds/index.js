import React, { Component } from 'react';
import Proptypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  connectInfiniteHits,
  connectStateResults,
} from 'react-instantsearch/connectors';
import { WindowScroller, AutoSizer } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import { propsChanged } from 'pesposa-utils';
import omitProps from 'utils/omitProps';
import { selectors as filterAdsSelectors } from 'store/filterAds';
import FetchAdsProgress from 'components/molecules/FetchAdsProgress';
import * as constants from './constants';
import Masonry from './Masonry';

const styles = {
  root: {
    flex: 1,
  },
};

export class ListAds extends Component {
  static propTypes = {
    hits: Proptypes.arrayOf(Proptypes.shape({})),
    refine: Proptypes.func.isRequired,
    hasMore: Proptypes.bool.isRequired,
    classes: Proptypes.shape({}).isRequired,
  };

  static defaultProps = {
    hits: [],
  };

  componentWillMount() {
    this.setLoadNextPage();
  }

  componentWillReceiveProps(nextProps) {
    if (
      (propsChanged(['currentPage'], this.props, nextProps) &&
        nextProps.currentPage === 0) ||
      propsChanged(['searchParams'], this.props, nextProps)
    ) {
      this.setLoadNextPage();
    }

    if (propsChanged(['hits'], this.props, nextProps)) {
      // FIXME: Find a way to avoid forced update
      // list doesn't update otherwise
      this.autoSizerRef.forceUpdate();
    }
  }

  setLoadNextPage() {
    this.loadNextPage = R.memoize(this.props.refine);
  }

  handleScroll = ({ scrollTop }) => {
    if (!this.props.hasMore) {
      return;
    }

    const listHeight = this.collectionRef.getTotalSize().height;

    if (
      scrollTop >=
      listHeight - this.containerHeight - constants.SCROLL_OFFSET_FETCH_TRIGGER
    ) {
      this.loadNextPage(this.props.hits.length);
    }
  };

  registerCollection = collectionRef => {
    this.collectionRef = collectionRef;
  };

  renderContent = ({ height, scrollTop }) => ({ width }) => {
    const { hits } = this.props;

    return (
      <Masonry
        registerCollection={this.registerCollection}
        containerWidth={width}
        containerHeight={height}
        scrollTop={scrollTop}
        hits={hits}
      />
    );
  };

  renderAutoSizer = ({ height, scrollTop }) => {
    this.containerHeight = height;

    return (
      <AutoSizer
        ref={ref => {
          this.autoSizerRef = ref;
        }}
        disableHeight
        height={height}
        scrollTop={scrollTop}
      >
        {this.renderContent({ height, scrollTop })}
      </AutoSizer>
    );
  };

  render() {
    const { hasMore, classes } = this.props;

    return (
      <div className={classes.root}>
        <WindowScroller onScroll={this.handleScroll}>
          {this.renderAutoSizer}
        </WindowScroller>
        <FetchAdsProgress hasMore={hasMore} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchParams: filterAdsSelectors.searchParamsSelector,
});

export default R.compose(
  connectInfiniteHits,
  connectStateResults,
  // Available props here:
  // https://community.algolia.com/react-instantsearch/connectors/connectStateResults.html
  withProps(({ searchState }) => ({
    currentPage: searchState.page,
  })),
  omitProps([
    'searchState',
    'searchResults',
    'searching',
    'allSearchResults',
    'isSearchStalled',
    'error',
    'searchingForFacetValues',
    'props',
  ]),
  connect(mapStateToProps),
  withStyles(styles),
)(ListAds);
