import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { createSelector, createStructuredSelector } from 'reselect';
import { WindowScroller, AutoSizer } from 'react-virtualized';
import withStyles from '@material-ui/core/styles/withStyles';
import * as layout from '@pesposa/core/src/config/layout';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import {
  selectors as scrollPositionSelectors,
  actions as scrollPositionActions,
} from '../../store/search/scrollPosition';
import { selectors as userInfoSelectors } from '../../store/userInfo';
import { selectors as responsiveSelectors } from '../../store/responsive';
import { selectors as modalsSelectors } from '../../store/modals';
import connectSearch from '../../hocs/connectSearch';
import * as constants from './constants';
import Masonry from './Masonry/Masonry';

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
    size: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    fixedCardHeight: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    hits: PropTypes.arrayOf(PropTypes.shape({})),
    loadNextPage: PropTypes.func,
    scrollPosition: PropTypes.number.isRequired,
    setScrollPosition: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    size: 'small',
    fixedCardHeight: null,
    hits: [],
    loadNextPage: noop,
  };

  componentDidMount() {
    const { scrollPosition } = this.props;
    window.scrollTo(0, scrollPosition);
    this.ensureCanScroll();
  }

  componentDidUpdate(prevProps) {
    this.ensureCanScroll();

    if (propsChanged(['hits'], prevProps, this.props)) {
      // TODO: Find a way to avoid forced update
      // list doesn't update otherwise
      this.autoSizerRef.forceUpdate();
    }
  }

  setScrollPosition = debounce(() => {
    const { setScrollPosition } = this.props;
    setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
  }, 100);

  handleScroll = ({ scrollTop }) => {
    const { hasOpenedModal, loadNextPage } = this.props;
    // TODO: Hacky way to avoid triggering many requests
    // when a modal is opened (since on mobile position: fixed is added to <body>).
    // We should fix all these issues by displaying mobile modals
    // on dedicated URLs.
    if (hasOpenedModal) {
      return;
    }

    const listHeight = this.collectionRef.getTotalSize().height;

    if (
      scrollTop >=
      listHeight - this.containerHeight - constants.SCROLL_OFFSET_FETCH_TRIGGER
    ) {
      loadNextPage();
    }

    this.setScrollPosition();
  };

  registerCollection = collectionRef => {
    this.collectionRef = collectionRef;
  };

  ensureCanScroll() {
    const { hits, loadNextPage } = this.props;
    const hasHits = R.complement(R.isEmpty)(hits);
    const shouldFetchMore =
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight <
      400;

    if (hasHits && shouldFetchMore) {
      loadNextPage();
    }
  }

  renderContent = ({ height, scrollTop }) => ({ width }) => {
    const { hits, size, fixedCardHeight } = this.props;

    return (
      <Masonry
        registerCollection={this.registerCollection}
        containerWidth={width}
        containerHeight={height}
        scrollTop={scrollTop}
        hits={hits}
        size={size}
        fixedCardHeight={fixedCardHeight}
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
    const { serverHeight, className, classes } = this.props;

    return (
      <div className={classNames(classes.root, className)}>
        <WindowScroller
          onScroll={this.handleScroll}
          serverHeight={serverHeight}
        >
          {this.renderAutoSizer}
        </WindowScroller>
      </div>
    );
  }
}

const serverWidthSelector = createSelector(
  R.compose(
    R.defaultTo(0),
    responsiveSelectors.fakeWidthSelector,
  ),
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
  serverWidth => (serverWidth * 16) / 9,
  serverWidthSelector,
);

const mapStateToProps = createStructuredSelector({
  scrollPosition: scrollPositionSelectors.scrollPositionSelector,
  serverWidth: serverWidthSelector,
  serverHeight: serverHeightSelector,
  hasOpenedModal: modalsSelectors.anyOpenSelector,
});

const mapDispatchToProps = {
  setScrollPosition: scrollPositionActions.setScrollPosition,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(ListAds);
