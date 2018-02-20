import { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import connectSearch from 'hocs/connectSearch';
import {
  selectors as searchSelectors,
  actions as searchActions,
} from 'store/search';
import { selectors as hitsSelectors } from 'store/search/hits';
import { selectors as pageSelectors } from 'store/search/page';
import renderNothingWhen from 'hocs/renderNothingWhen';

const NEXT_PAGE_TRIGGER_OFFSET = 3;

class BrowseAds extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      hitIndex,
      fetchedHitsCount,
      page,
      noMoreResults,
      loadPage,
    } = nextProps;

    if (noMoreResults) {
      return;
    }

    if (fetchedHitsCount - hitIndex + 1 === NEXT_PAGE_TRIGGER_OFFSET) {
      loadPage(page + 1);
    }
  }

  render() {
    const { previousAd, nextAd } = this.props;
    return this.props.children({ previousAd, nextAd });
  }
}

BrowseAds.propTypes = {
  adId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  previousAd: PropTypes.shape({}),
  nextAd: PropTypes.shape({}),
};

BrowseAds.defaultProps = {
  previousAd: null,
  nextAd: null,
};

const mapStateToProps = createStructuredSelector({
  isHitsEmpty: hitsSelectors.isHitsEmptySelector,
  hitIndex: (state, { adId }) =>
    hitsSelectors.hitIndexSelector(state, { id: adId }),
  fetchedHitsCount: hitsSelectors.hitsCountSelector,
  noMoreResults: searchSelectors.noMoreResultsSelector,
  page: pageSelectors.pageSelector,
  previousAd: (state, { adId }) =>
    hitsSelectors.previousHitSelector(state, { id: adId }),
  nextAd: (state, { adId }) =>
    hitsSelectors.nextHitSelector(state, { id: adId }),
});

const mapDispatchToProps = {
  loadPage: searchActions.loadPage,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  renderNothingWhen(R.prop('isHitsEmpty')),
)(BrowseAds);
