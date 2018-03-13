import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { actions as searchActions } from 'store/search';
import { selectors as hitsSelectors } from 'store/search/hits';
import { selectors as pageSelectors } from 'store/search/page';
import {
  selectors as categorySelectors,
  actions as categoryActions,
} from 'store/search/category';
import {
  selectors as ramParamsSelecotrs,
  actions as rawParamsActions,
} from 'store/search/rawParams';
import connectSearch from 'hocs/connectSearch';

class Search extends React.Component {
  componentWillMount() {
    const {
      category,
      currentCategory,
      setSelectedCategory,
      params,
      currentParams,
      setRawParams,
    } = this.props;
    if (category !== currentCategory) {
      setSelectedCategory(category);
    }

    if (!R.equals(params, currentParams)) {
      setRawParams(params);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.props.setSelectedCategory(nextProps.category);
    }

    if (propsChanged(['params'], this.props, nextProps)) {
      this.props.setRawParams(nextProps.params);
    }
  }

  render() {
    const { hits, page, loadPage, children } = this.props;

    return children({
      hits,
      page,
      loadPage,
    });
  }
}

const mapStateToProps = createStructuredSelector({
  hits: hitsSelectors.hitsSelector,
  page: pageSelectors.pageSelector,
  currentCategory: categorySelectors.categorySelector,
  currentParams: ramParamsSelecotrs.rawParamsSelector,
});

const mapDispatchToProps = {
  loadPage: searchActions.loadPage,
  setSelectedCategory: categoryActions.setCategory,
  setRawParams: rawParamsActions.setRawParams,
};

export default connectSearch(mapStateToProps, mapDispatchToProps)(Search);
