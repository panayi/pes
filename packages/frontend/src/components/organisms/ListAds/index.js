import React, { Component } from 'react';
import Proptypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { WindowScroller, AutoSizer } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import { propsChanged } from 'pesposa-utils';
import {
  selectors as searchSelectors,
  actions as searchActions,
} from 'store/search';
import { selectors as hitsSelectors } from 'store/search/hits';
import { selectors as pageSelectors } from 'store/search/page';
import * as constants from './constants';
import Masonry from './Masonry';
import FetchAdsProgress from './FetchAdsProgress';

const styles = {
  root: {
    flex: 1,
  },
};

export class ListAds extends Component {
  static propTypes = {
    hits: Proptypes.arrayOf(Proptypes.shape({})),
    classes: Proptypes.shape({}).isRequired,
  };

  static defaultProps = {
    hits: [],
  };

  componentWillMount() {
    this.props.loadPage(0);
  }

  componentWillReceiveProps(nextProps) {
    if (propsChanged(['hits'], this.props, nextProps)) {
      // FIXME: Find a way to avoid forced update
      // list doesn't update otherwise
      this.autoSizerRef.forceUpdate();
    }
  }

  handleScroll = ({ scrollTop }) => {
    const listHeight = this.collectionRef.getTotalSize().height;

    if (
      scrollTop >=
      listHeight - this.containerHeight - constants.SCROLL_OFFSET_FETCH_TRIGGER
    ) {
      this.props.loadPage(this.props.page + 1);
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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <WindowScroller onScroll={this.handleScroll}>
          {this.renderAutoSizer}
        </WindowScroller>
        <FetchAdsProgress />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hits: hitsSelectors.hitsSelector,
  page: pageSelectors.pageSelector,
  searchParams: searchSelectors.searchParamsSelector,
});

const mapDispatchToProps = {
  loadPage: searchActions.loadPage,
};

export default R.compose(
  // connectInfiniteHits,
  // connectStateResults,
  // Available props here:
  // withProps(({ searchState }) => ({
  //   currentPage: searchState.page,
  // })),
  // omitProps([
  //   'searchState',
  //   'searchResults',
  //   'searching',
  //   'allSearchResults',
  //   'isSearchStalled',
  //   'error',
  //   'searchingForFacetValues',
  //   'props',
  // ]),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(ListAds);
