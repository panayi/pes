/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import List, { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { propSelector } from 'pesposa-utils';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import translate from 'components/hocs/translate';
import Link from 'components/atoms/Link';

type LinkType = {
  key: String,
  label: String,
  to: String,
};

type Props = {
  categoryLinks: Array<LinkType>,
  classes: Object,
};

const styles = theme => ({
  list: {
    flex: 0,
    padding: 0,
  },
  item: {
    padding: 0,
    '& + &': {
      paddingTop: theme.spacing.unit / 2,
    },
  },
  link: {
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: 'auto',
    padding: 0,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover': {
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: 'transparent',
    },
  },
  active: {
    background: theme.palette.divider,
  },
});

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
            <ListItem
              key={key}
              classes={{ root: classes.item }}
              disableRipple
              dense
            >
              <Link
                to={to}
                className={classes.link}
                activeClassName={classes.active}
              >
                {label}
              </Link>
            </ListItem>
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
    R.map(
      ({ key }) => ({
        key,
        label: t(key),
        to: `/${key}`,
      }),
      categories,
    ),
);

export default R.compose(
  connectData({ categories: models.categories.all }),
  translate('home'),
  withProps(
    createStructuredSelector({
      categoryLinks: categoryLinksSelector,
    }),
  ),
  withStyles(styles),
)(FilterByCategory);
