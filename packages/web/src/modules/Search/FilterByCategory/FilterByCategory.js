/* @flow */
import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { defaultProps } from 'recompose';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from 'store/search/params';
import List from 'material-ui/List';
import withStyles from 'material-ui/styles/withStyles';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import { selectors as authSelectors } from 'store/firebase/auth';
import { actions as modalActions } from 'store/modals';
import { selectors as profileSelectors } from 'store/firebase/profile';
import connectSearch from 'hocs/connectSearch';
import translate from 'hocs/translate';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import FilterOption from '../FilterOption/FilterOption';
import ConfirmAdult from './ConfirmAdult/ConfirmAdult';

type LinkType = {
  id: String,
  label: String,
  to: String,
};

type Props = {
  categoryLinks: Array<LinkType>,
  currentCategory: string,
  setCategory: Function,
  classes: Object,
};

const styles = {
  list: {
    flex: 0,
    padding: 0,
  },
};

class FilterByCategory extends React.Component<Props> {
  setCategory = category => {
    const id = category.id === 'all' ? null : category.id;
    this.props.setCategory(id);
  };

  confirmAdult = category => {
    const { adult, openModal } = this.props;

    if (adult) {
      this.setCategory(category);
    } else {
      openModal('confirmAdult', {
        onSuccess: () => this.setCategory(category),
      });
    }
  };

  handleCategoryClick = category => {
    const { isAuthenticated, openModal } = this.props;

    if (category.requireAdult && !isAuthenticated) {
      openModal('login', {
        onSuccess: () => this.confirmAdult(category),
      });
    } else if (category.requireAdult && isAuthenticated) {
      this.confirmAdult(category);
    } else {
      this.setCategory(category);
    }
  };

  renderContent = () => {
    const { categoryLinks, currentCategory, classes } = this.props;

    return (
      <React.Fragment>
        <List classes={{ root: classes.list }}>
          {R.map(
            category => (
              <FilterOption
                key={category.id}
                active={
                  category.id === 'all'
                    ? R.isNil(currentCategory)
                    : category.id === currentCategory
                }
                onClick={() => this.handleCategoryClick(category)}
              >
                {category.label}
              </FilterOption>
            ),
            R.values(categoryLinks),
          )}
        </List>
        <ReduxModal id="confirmAdult" content={ConfirmAdult} />
      </React.Fragment>
    );
  };

  render() {
    const { hasValue, resetCategory, children } = this.props;

    return children({
      render: this.renderContent,
      hasValue,
      reset: resetCategory,
    });
  }
}

const categoryLinksSelector = (state, props) => {
  const { categories, t } = props;
  return R.compose(
    R.prepend({
      id: 'all',
      label: 'All',
    }),
    R.map(category => ({
      ...category,
      label: t(category.id),
    })),
    R.defaultTo([]),
  )(categories);
};

const mapStateToProps = createStructuredSelector({
  currentCategory: paramsSelectors.categorySelector,
  hasValue: paramsSelectors.categoryHasValueSelector,
  categoryLinks: categoryLinksSelector,
  isAuthenticated: authSelectors.isAuthenticatedSelector,
  adult: profileSelectors.profileAdultSelector,
});

const mapDispatchToProps = {
  setCategory: paramsActions.setCategory,
  resetCategory: paramsActions.resetCategory,
  openModal: modalActions.openModal,
};

export default R.compose(
  connectData({ categories: models.categories.all }),
  translate('categories'),
  defaultProps({
    categories: [],
  }),
  connectSearch(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(FilterByCategory);
