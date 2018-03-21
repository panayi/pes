import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { WindowScroller, AutoSizer } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
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
    hits: PropTypes.arrayOf(PropTypes.shape({})),
    loadNextPage: PropTypes.func.isRequired,
    scrollPosition: PropTypes.number.isRequired,
    setScrollPosition: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    params: null,
    hits: [],
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

  componentWillUnmount() {
    this.props.setScrollPosition(window.scrollY);
  }

  ensureCanScroll() {
    const hasHits = R.complement(R.isEmpty)(this.props.hits);
    const scrollIsVisible =
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight;

    if (hasHits && !scrollIsVisible) {
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
        <WindowScroller
          onScroll={this.handleScroll}
          serverWidth={0}
          serverHeight={0}
        >
          {this.renderAutoSizer}
        </WindowScroller>
        <FetchAdsProgress />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  scrollPosition: scrollPositionSelectors.scrollPositionSelector,
});

const mapDispatchToProps = {
  setScrollPosition: scrollPositionActions.setScrollPosition,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(ListAds);
