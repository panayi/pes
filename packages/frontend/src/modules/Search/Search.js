/* @flow */
import * as R from 'ramda';
import { withProps, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  selectors as categorySelectors,
  actions as categoryActions,
} from 'store/search/category';
import connectSearch from 'hocs/connectSearch';
import ListAds from 'components/ListAds/ListAds';

const mapStateToProps = createStructuredSelector({
  selectedCategory: categorySelectors.categorySelector,
});

const mapDispatchToProps = {
  setSelectedCategory: categoryActions.setCategory,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  withProps(() => ({
    params: { facetFilters: ['sold:false'] },
  })),
  lifecycle({
    componentWillMount() {
      const { selectedCategory, category, setSelectedCategory } = this.props;

      if (category !== selectedCategory) {
        setSelectedCategory(category);
      }
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.category !== this.props.category) {
        this.props.setSelectedCategory(nextProps.category);
      }
    },
  }),
)(ListAds);
