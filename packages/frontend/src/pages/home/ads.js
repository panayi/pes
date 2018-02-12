/* @flow */
import * as R from 'ramda';
import { withProps, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  selectors as categorySelectors,
  actions as categoryActions,
} from 'store/search/category';
import connectSearch from 'components/hocs/connectSearch';
import ListAds from 'components/organisms/ListAds';

const mapStateToProps = createStructuredSelector({
  category: categorySelectors.categorySelector,
});

const mapDispatchToProps = {
  setSelectedCategory: categoryActions.setCategory,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    currentCategory: R.pathOr(null, ['match', 'params', 'category'], props),
  })),
  lifecycle({
    componentWillMount() {
      const { category, currentCategory, setSelectedCategory } = this.props;

      if (currentCategory !== category) {
        setSelectedCategory(currentCategory);
      }
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.currentCategory !== this.props.currentCategory) {
        this.props.setSelectedCategory(nextProps.currentCategory);
      }
    },
  }),
)(ListAds);
