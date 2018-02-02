/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { propSelector } from 'pesposa-core/utils';
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
  title: {
    color: theme.palette.common.lightBlack,
  },
  item: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  active: {
    background: theme.palette.text.divider,
  },
});

class CategoryLinks extends Component<Props> {
  static defaultProps = {
    categories: [],
  };

  render() {
    const { categoryLinks, classes } = this.props;

    return (
      <List>
        <ListItem>
          <Typography className={classes.title} type="subheading">
            Categories
          </Typography>
        </ListItem>
        {R.map(
          ({ key, label, to }) => (
            <ListItem
              key={key}
              classes={{
                root: classes.item,
                button: classes.button,
              }}
              component={Link}
              activeClassName={classes.active}
              to={to}
              disableRipple
            >
              {label}
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
)(CategoryLinks);
