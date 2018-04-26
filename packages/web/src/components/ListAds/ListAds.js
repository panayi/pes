import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import debounce from 'lodash.debounce';
import { createSelector, createStructuredSelector } from 'reselect';
import { WindowScroller, AutoSizer } from 'react-virtualized';
import withStyles from 'material-ui/styles/withStyles';
import * as layout from '@pesposa/core/src/config/layout';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import {
  selectors as scrollPositionSelectors,
  actions as scrollPositionActions,
} from 'store/search/scrollPosition';
import { selectors as userInfoSelectors } from 'store/userInfo';
import { selectors as responsiveSelectors } from 'store/responsive';
import connectSearch from 'hocs/connectSearch';
import * as constants from './constants';
import Masonry from './Masonry/Masonry';
import FetchAdsProgress from './FetchAdsProgress/FetchAdsProgress';

const styles = {
  '@global': {
    body: {
      // Fixes issue where scrolling to bottom and fetching next page,
      // scrolling remains at the bottom after next page render,
      // leading to another page being fetched.
      overflowAnchor: 'none',
    },
  },
  root: {
    flex: 1,
  },
};

export class ListAds extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.shape({})),
    loadNextPage: PropTypes.func.isRequired,
    noResults: PropTypes.node,
    scrollPosition: PropTypes.number.isRequired,
    setScrollPosition: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    hits: [],
    noResults: null,
  };

  componentDidMount() {
    window.scrollTo(0, this.props.scrollPosition);
    this.ensureCanScroll();
  }

  componentWillReceiveProps(nextProps) {
    if (propsChanged(['hits'], this.props, nextProps)) {
      // TODO: Find a way to avoid forced update
      // list doesn't update otherwise
      this.autoSizerRef.forceUpdate();
    }
  }

  componentDidUpdate() {
    this.ensureCanScroll();
  }

  setScrollPosition = debounce(() => {
    this.props.setScrollPosition(
      window.pageYOffset || document.documentElement.scrollTop,
    );
  }, 100);

  ensureCanScroll() {
    const hasHits = R.complement(R.isEmpty)(this.props.hits);
    const shouldFetchMore =
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight <
      400;

    if (hasHits && shouldFetchMore) {
      this.props.loadNextPage();
    }
  }

  handleScroll = ({ scrollTop }) => {
    const listHeight = this.collectionRef.getTotalSize().height;

    if (
      scrollTop >=
      listHeight - this.containerHeight - constants.SCROLL_OFFSET_FETCH_TRIGGER
    ) {
      this.props.loadNextPage();
    }

    this.setScrollPosition();
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
    const { serverWidth } = this.props;
    this.containerHeight = height;

    return (
      <AutoSizer
        ref={ref => {
          this.autoSizerRef = ref;
        }}
        disableHeight
        height={height}
        defaultWidth={serverWidth}
        scrollTop={scrollTop}
      >
        {this.renderContent({ height, scrollTop })}
      </AutoSizer>
    );
  };

  render() {
    const { serverHeight, noResults, classes } = this.props;

    return (
      <div className={classes.root}>
        <WindowScroller
          onScroll={this.handleScroll}
          serverHeight={serverHeight}
        >
          {this.renderAutoSizer}
        </WindowScroller>
        <FetchAdsProgress noResults={noResults} />
      </div>
    );
  }
}

const serverWidthSelector = createSelector(
  R.compose(R.defaultTo(0), responsiveSelectors.fakeWidthSelector),
  responsiveSelectors.isPhoneSelector,
  userInfoSelectors.isBotSelector,
  (fakeWidth, isPhone, isBot) => {
    if (isPhone && !isBot) {
      return 0;
    }

    const finalWidth = fakeWidth - layout.SIDEBAR_WIDTH;
    return finalWidth > 0 ? finalWidth : 0;
  },
);

const serverHeightSelector = R.compose(
  serverWidth => serverWidth * 16 / 9,
  serverWidthSelector,
);

const mapStateToProps = createStructuredSelector({
  scrollPosition: scrollPositionSelectors.scrollPositionSelector,
  serverWidth: serverWidthSelector,
  serverHeight: serverHeightSelector,
});

const mapDispatchToProps = {
  setScrollPosition: scrollPositionActions.setScrollPosition,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(ListAds);
