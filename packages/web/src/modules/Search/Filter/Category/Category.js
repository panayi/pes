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
import { withStyles } from 'material-ui/styles';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import connectSearch from 'hocs/connectSearch';
import translate from 'hocs/translate';
import FilterOption from '../FilterOption/FilterOption';

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

const FilterByCategory = ({
  categoryLinks,
  currentCategory,
  setCategory,
  classes,
}: Props) => (
  <List classes={{ root: classes.list }}>
    {R.map(
      ({ id, label }) => (
        <FilterOption
          key={id}
          active={
            id === 'all' ? R.isNil(currentCategory) : id === currentCategory
          }
          onClick={() => setCategory(id === 'all' ? null : id)}
        >
          {label}
        </FilterOption>
      ),
      R.values(categoryLinks),
    )}
  </List>
);

const categoryLinksSelector = (state, props) => {
  const { categories, t } = props;
  return R.compose(
    R.prepend({
      id: 'all',
      label: 'All',
    }),
    R.map(({ id }) => ({
      id,
      label: t(id),
    })),
  )(categories);
};

const mapStateToProps = createStructuredSelector({
  currentCategory: paramsSelectors.categorySelector,
  categoryLinks: categoryLinksSelector,
});

const mapDispatchToProps = {
  setCategory: paramsActions.setCategory,
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
