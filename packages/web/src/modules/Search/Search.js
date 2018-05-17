import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import {
  actions as searchActions,
  selectors as searchSelectors,
} from 'store/search';
import { selectors as pageSelectors } from 'store/search/page';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from 'store/search/params';
import connectSearch from 'hocs/connectSearch';
import RequireAdult from 'components/RequireAdult/RequireAdult';

class Search extends React.Component {
  componentDidMount() {
    const {
      params,
      paramsState,
      searchParams,
      setParamsFromProps,
      loadPage,
      loadFirstPage,
    } = this.props;
    this.initialParamsState = R.merge(paramsState, params);
    setParamsFromProps(params);

    if (isNilOrEmpty(searchParams.query)) {
      loadPage(0);
    } else {
      // If query is set, it means the search form was submitted from another page
      // Later, if we serialize query value into URL, we should use a different logic.
      loadFirstPage();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!R.equals(nextProps.params, this.props.params)) {
      this.props.setParamsFromProps(nextProps.params);
    }

    const indexNameChanged = !R.equals(
      nextProps.indexName,
      this.props.indexName,
    );
    const searchParamsChanged = !R.equals(
      nextProps.searchParams,
      this.props.searchParams,
    );

    if (indexNameChanged || searchParamsChanged) {
      this.handleLoadFirstPage(nextProps);
    }
  }

  handleLoadFirstPage = props => {
    const { loadFirstPage, mapParamsToUrl, match, history } = props;

    this.initialParamsState = null;
    loadFirstPage();

    if (mapParamsToUrl) {
      const nextUrl = mapParamsToUrl(props.paramsState);

      if (nextUrl !== match.url) {
        history.push(nextUrl);
      }
    }
  };

  handleLoadNextPage = () => {
    const { page, loadPage } = this.props;
    loadPage(page + 1);
  };

  render() {
    const { hits, currentCategory, setCategory, children } = this.props;

    return (
      <RequireAdult
        id="Search-confirmAdult"
        enabled={currentCategory && currentCategory.requireAdult}
        onReject={() => setCategory(null)}
      >
        {children({
          hits,
          loadNextPage: this.handleLoadNextPage,
        })}
      </RequireAdult>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  paramsState: paramsSelectors.paramsSelector,
  currentCategory: paramsSelectors.categoryObjectSelector(),
  searchParams: searchSelectors.searchParamsSelector,
  indexName: searchSelectors.indexNameSelector,
  hits: searchSelectors.hitsSelector,
  page: pageSelectors.pageSelector,
});

const mapDispatchToProps = {
  setParamsFromProps: paramsActions.setParamsFromProps,
  setCategory: paramsActions.setCategory,
  loadFirstPage: searchActions.loadFirstPage,
  loadPage: searchActions.loadPage,
};

export default R.compose(
  connectData({ categories: models.categories.all }),
  connectSearch(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Search);
