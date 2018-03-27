import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import {
  actions as searchActions,
  selectors as searchSelectors,
} from 'store/search';
import { selectors as hitsSelectors } from 'store/search/hits';
import { selectors as pageSelectors } from 'store/search/page';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from 'store/search/params';
import connectSearch from 'hocs/connectSearch';

class Search extends React.Component {
  componentDidMount() {
    const { params, paramsState, setParamsFromProps, loadPage } = this.props;
    this.initialParamsState = R.merge(paramsState, params);
    setParamsFromProps(params);
    loadPage(0);
  }

  componentWillReceiveProps(nextProps) {
    if (!R.equals(nextProps.params, this.props.params)) {
      this.props.setParamsFromProps(nextProps.params);
    }

    const indexNameChanged = !R.equals(
      nextProps.indexName,
      this.props.indexName,
    );
    const isInitialParams = R.equals(
      nextProps.paramsState,
      this.initialParamsState,
    );
    const searchParamsChanged = !R.equals(
      nextProps.searchParams,
      this.props.searchParams,
    );

    if (indexNameChanged || (!isInitialParams && searchParamsChanged)) {
      const { loadFirstPage, mapParamsToUrl, match, history } = this.props;
      loadFirstPage();
      this.initialParamsState = null;

      if (mapParamsToUrl) {
        const nextUrl = mapParamsToUrl(nextProps.paramsState);

        if (nextUrl !== match.url) {
          history.push(nextUrl);
        }
      }
    }
  }

  handleLoadNextPage = () => {
    const { page, loadPage } = this.props;
    loadPage(page + 1);
  };

  render() {
    const { hits, children } = this.props;

    return children({
      hits,
      loadNextPage: this.handleLoadNextPage,
    });
  }
}

const mapStateToProps = createStructuredSelector({
  paramsState: paramsSelectors.paramsSelector,
  searchParams: searchSelectors.searchParamsSelector,
  indexName: searchSelectors.indexNameSelector,
  hits: hitsSelectors.hitsSelector,
  page: pageSelectors.pageSelector,
});

const mapDispatchToProps = {
  setParamsFromProps: paramsActions.setParamsFromProps,
  loadFirstPage: searchActions.loadFirstPage,
  loadPage: searchActions.loadPage,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Search);
