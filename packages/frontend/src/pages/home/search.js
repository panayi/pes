import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { Helmet } from 'react-helmet';
import { withStyles } from 'material-ui/styles';
import { selectors as routerSelectors } from 'store/router';
import Layout from 'layouts/Layout/Layout';
import Search from 'modules/Search/Search';
import Header from 'pages/components/Header/Header';
import Sidebar from './Sidebar/Sidebar';

const getTitle = ({ place, category }) => {
  if (place && category) {
    return `Buy and sell ${category} in ${place} - Pesposa`;
  }

  if (place) {
    return `Buy and sell stuff in ${place} - Pesposa`;
  }

  if (category) {
    return `Buy and sell ${category} in Cyprus - Pesposa`;
  }

  return null;
};

const styles = theme => ({
  page: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

const HomeHeader = withProps({ inHome: true })(Header);

const SearchPage = ({ place, category, classes }) => {
  const title = getTitle({ place, category });

  return (
    <Layout
      header={HomeHeader}
      sidebar={Sidebar}
      pageClassName={classes.page}
      flex
    >
      <Helmet>{title && <title>{title}</title>}</Helmet>
      <Search place={place} category={category} />
    </Layout>
  );
};

export default R.compose(
  withProps(
    createStructuredSelector({
      place: routerSelectors.routeParamSelector('place'),
      category: routerSelectors.routeParamSelector('category'),
    }),
  ),
  withStyles(styles),
)(SearchPage);
