import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { Helmet } from 'react-helmet';
import { withStyles } from 'material-ui/styles';
import getMetaTags from 'utils/getMetaTags';
import { selectors as routerSelectors } from 'store/router';
import Layout from 'layouts/Layout/Layout';
import ListAds from 'components/ListAds/ListAds';
import Search from 'modules/Search/Search';
import SearchFilters from 'modules/Search/Filters/Filters';
import Header from 'pages/components/Header/Header';

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
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5,
    [theme.breakpoints.down(theme.map.phone)]: {
      paddingTop: theme.spacing.unit * 2,
    },
  },
  sidebar: {
    [theme.breakpoints.down(theme.layout.breakpoints.filtersDialog)]: {
      display: 'none',
    },
  },
});

const HomeHeader = withProps({ inHome: true })(Header);

const SearchPage = ({ place, category, classes }) => (
  <Layout
    header={HomeHeader}
    sidebar={SearchFilters}
    pageClassName={classes.page}
    sidebarClassName={classes.sidebar}
    flex
  >
    <Helmet {...getMetaTags({ title: getTitle({ place, category }) })} />
    <Search
      place={place}
      category={category}
      params={{ facetFilters: ['sold:false'] }}
    >
      {props => <ListAds {...props} />}
    </Search>
  </Layout>
);

export default R.compose(
  withProps(
    createStructuredSelector({
      place: routerSelectors.routeParamSelector('place'),
      category: routerSelectors.routeParamSelector('category'),
    }),
  ),
  withStyles(styles),
)(SearchPage);
