import React from 'react';
import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps, setStatic } from 'recompose';
import { bindActionCreators } from 'multireducer';
import { Helmet } from 'react-helmet';
import { withStyles } from 'material-ui/styles';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import getMetaTags from 'utils/getMetaTags';
import {
  actions as searchActions,
  constants as searchConstants,
} from 'store/search';
import { actions as paramsActions } from 'store/search/params';
import { selectors as routerSelectors } from 'store/router';
import Layout from 'layouts/Layout/Layout';
import needsBetaUser from 'hocs/needsBetaUser';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import ListAds from 'components/ListAds/ListAds';
import GetCurrentPosition from 'modules/GetCurrentPosition/GetCurrentPosition';
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

  return 'Buy and sell stuff in Cyprus - Pesposa';
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

const Home = ({ place, category, searchParamsFromProps, classes }) => (
  <GetCurrentPosition>
    <Layout
      header={HomeHeader}
      sidebar={SearchFilters}
      pageClassName={classes.page}
      sidebarClassName={classes.sidebar}
      flex
    >
      <Helmet
        {...getMetaTags({
          title: getTitle({ place, category }),
          description:
            'Sell your stuff quickly and connect with thousands of buyers. Find cars, houses, electronics and much more, near your location.',
        })}
      />
      <Search
        params={searchParamsFromProps}
        mapParamsToUrl={({ category: cat }) => (cat ? `/${cat}` : '/')}
      >
        {props => <ListAds {...props} />}
      </Search>
      <ReduxModal id="searchFilters" content={SearchFilters} direction="down" />
    </Layout>
  </GetCurrentPosition>
);

export const searchParamsFromPropsSelector = createSelector(
  R.compose(R.defaultTo(null), routerSelectors.routeParamSelector('category')),
  category => ({
    category,
    sold: false,
  }),
);

export default R.compose(
  setStatic('getInitialProps', async ({ match, store }) => {
    // TODO: should we do this?
    if (process.browser) {
      return null;
    }

    const actions = bindActionCreators(
      {
        loadFirstPage: searchActions.loadFirstPage,
        setParamsFromProps: paramsActions.setParamsFromProps,
      },
      store.dispatch,
      searchConstants.HOME_SEARCH_ID,
    );

    const paramsFromProps = searchParamsFromPropsSelector({ match });
    actions.setParamsFromProps(paramsFromProps);

    await Promise.all([
      store.firebase.promiseEvents([
        { path: modelPaths.CATEGORIES.string, type: 'once' },
        { path: modelPaths.TRANSLATIONS('en', []).string, type: 'once' },
      ]),
      actions.loadFirstPage(),
    ]);

    return store.getState();
  }),
  needsBetaUser,
  withProps(
    createStructuredSelector({
      searchParamsFromProps: searchParamsFromPropsSelector,
      category: routerSelectors.routeParamSelector('category'),
    }),
  ),
  withStyles(styles),
)(Home);
