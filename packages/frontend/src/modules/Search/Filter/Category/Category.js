/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { propSelector } from 'pesposa-utils';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import translate from 'hocs/translate';
import FilterOption from 'components/FilterOption/FilterOption';
import Link from 'components/Link/Link';

type LinkType = {
  key: String,
  label: String,
  to: String,
};

type Props = {
  categoryLinks: Array<LinkType>,
  classes: Object,
};

const styles = {
  list: {
    flex: 0,
    padding: 0,
  },
};

class FilterByCategory extends Component<Props> {
  static defaultProps = {
    categories: [],
  };

  render() {
    const { categoryLinks, classes } = this.props;

    return (
      <List classes={{ root: classes.list }}>
        {R.map(
          ({ key, label, to }) => (
            <FilterOption
              key={key}
              buttonComponent={Link}
              buttonProps={{
                to,
                exact: true,
                activeClassName: classes.active,
              }}
            >
              {label}
            </FilterOption>
          ),
          categoryLinks,
        )}
      </List>
    );
  }
}

const categoryLinksSelector = createSelector(
  propSelector('t'),
  propSelector('categories'),
  (t, categories) =>
    R.compose(
      R.prepend({
        key: 'home',
        label: 'All',
        to: '/',
      }),
      R.map(({ key }) => ({
        key,
        label: t(key),
        to: `/${key}`,
      })),
    )(categories),
);

export default R.compose(
  connectData({ categories: models.categories.all }),
  translate('categories'),
  withProps(
    createStructuredSelector({
      categoryLinks: categoryLinksSelector,
    }),
  ),
  withStyles(styles),
)(FilterByCategory);
