import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
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
import { actions as searchUserActions } from 'store/search/user';
import {
  selectors as scrollPositionSelectors,
  actions as scrollPositionActions,
} from 'store/search/scrollPosition';
import connectSearch from 'hocs/connectSearch';
import * as constants from './constants';
import Masonry from './Masonry/Masonry';
import FetchAdsProgress from './FetchAdsProgress/FetchAdsProgress';

const styles = {
  root: {
    flex: 1,
  },
};

export class ListAds extends Component {
  static propTypes = {
    userId: PropTypes.string,
    hits: PropTypes.arrayOf(PropTypes.shape({})),
    setUser: PropTypes.func.isRequired,
    scrollPosition: PropTypes.number.isRequired,
    setScrollPosition: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    userId: null,
    hits: [],
  };

  componentWillMount() {
    const { setUser, userId, loadPage } = this.props;
    if (userId) {
      setUser(userId);
    }
    loadPage(0);
  }

  componentDidMount() {
    window.scrollTo(0, this.props.scrollPosition);
  }

  componentWillReceiveProps(nextProps) {
    if (propsChanged(['hits'], this.props, nextProps)) {
      // FIXME: Find a way to avoid forced update
      // list doesn't update otherwise
      this.autoSizerRef.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.props.setScrollPosition(window.scrollY);
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
  scrollPosition: scrollPositionSelectors.scrollPositionSelector,
});

const mapDispatchToProps = {
  loadPage: searchActions.loadPage,
  setUser: searchUserActions.setUser,
  setScrollPosition: scrollPositionActions.setScrollPosition,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(ListAds);
