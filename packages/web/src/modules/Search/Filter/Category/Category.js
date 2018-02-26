/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { defaultProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import { selectors as routerSelectors } from 'store/router';
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

const FilterByCategory = ({ categoryLinks, classes }: Props) => (
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
      R.values(categoryLinks),
    )}
  </List>
);

const categoryLinksSelector = (state, props) => {
  const { categories, t, match } = props;
  return R.compose(
    R.prepend({
      key: 'home',
      label: 'All',
      to: routerSelectors.searchPathSelector({ category: null, match }),
    }),
    R.map(({ key }) => ({
      key,
      label: t(key),
      to: routerSelectors.searchPathSelector({ category: key, match }),
    })),
  )(categories);
};

const mapStateToProps = createStructuredSelector({
  categoryLinks: categoryLinksSelector,
});

export default R.compose(
  connectData({ categories: models.categories.all }),
  withRouter,
  translate('categories'),
  defaultProps({
    categories: [],
  }),
  connect(mapStateToProps),
  withStyles(styles),
)(FilterByCategory);
