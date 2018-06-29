import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { defaultProps } from 'recompose';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';

import withStyles from '@material-ui/core/styles/withStyles';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from '../../../store/search/params';
import { connectData } from '../../../lib/connectData';
import { models } from '../../../store/firebase/data';
import { selectors as authSelectors } from '../../../store/firebase/auth';
import { actions as modalActions } from '../../../store/modals';
import { selectors as profileSelectors } from '../../../store/firebase/profile';
import connectSearch from '../../../hocs/connectSearch';
import translate from '../../../hocs/translate';
import RequireAdult from '../../../components/RequireAdult/RequireAdult';
import TrackOnCall from '../../Mixpanel/TrackOnCall/TrackOnCall';
import FilterOption from '../FilterOption/FilterOption';

// type LinkType = {
//   id: String,
//   label: String,
//   to: String,
// };

// type Props = {
//   categoryLinks: Array<LinkType>,
//   currentCategoryId: string,
//   setCategory: Function,
//   classes: Object,
// };

const styles = theme => ({
  confirmAdultBackdrop: {
    backgroundColor: theme.palette.common.black,
  },
  list: {
    flex: 0,
    padding: 0,
  },
  new: {
    display: 'inline-block',
    height: 'auto',
    marginLeft: 6,
    lineHeight: '1.5em',
    textDecoration: 'none',
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
});

class FilterByCategory extends React.Component {
  setCategory = category => {
    const { setCategory } = this.props;
    const id = category.id === 'all' ? null : category.id;
    setCategory(id);
  };

  handleCategoryClick = (category, confirmAdult) => {
    if (category.requireAdult) {
      confirmAdult({
        onAccept: () => this.setCategory(category),
      });
    } else {
      this.setCategory(category);
    }
  };

  renderContent = () => {
    const { categoryLinks, currentCategoryId, classes } = this.props;

    return (
      <RequireAdult id="FilterByCategory-confirmAdult">
        {({ confirmAdult }) => (
          <TrackOnCall>
            {({ track }) => (
              <List classes={{ root: classes.list }}>
                {R.map(
                  category => (
                    <FilterOption
                      key={category.id}
                      active={
                        category.id === 'all'
                          ? R.isNil(currentCategoryId)
                          : category.id === currentCategoryId
                      }
                      onClick={track(
                        () => this.handleCategoryClick(category, confirmAdult),
                        'filterAdsByCategory',
                        { value: category.id },
                      )}
                    >
                      {category.label}
                      {category.isNew ? (
                        <Chip label="New!" className={classes.new} />
                      ) : null}
                    </FilterOption>
                  ),
                  R.values(categoryLinks),
                )}
              </List>
            )}
          </TrackOnCall>
        )}
      </RequireAdult>
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
      label: t('all'),
    }),
    R.map(category => ({
      ...category,
      label: t(category.id),
    })),
    R.sortBy(R.prop('order')),
    R.defaultTo([]),
  )(categories);
};

const mapStateToProps = createStructuredSelector({
  currentCategoryId: paramsSelectors.categorySelector,
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
  withRouter,
  defaultProps({
    categories: [],
  }),
  connectSearch(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(FilterByCategory);
