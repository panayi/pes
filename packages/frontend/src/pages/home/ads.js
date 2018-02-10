/* @flow */
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withProps, lifecycle } from 'recompose';
import { actions as categoryActions } from 'store/search/category';
import ListAds from 'components/organisms/ListAds';

const mapDispatchToProps = {
  setSelectedCategory: categoryActions.setCategory,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withProps(props => ({
    currentCategory: R.path(['match', 'params', 'category'], props),
  })),
  lifecycle({
    componentWillMount() {
      const { currentCategory, setSelectedCategory } = this.props;
      setSelectedCategory(currentCategory);
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.currentCategory !== this.props.currentCategory) {
        this.props.setSelectedCategory(nextProps.currentCategory);
      }
    },
  }),
)(ListAds);
