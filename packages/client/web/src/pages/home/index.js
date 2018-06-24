import React from 'react';
import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps, setStatic } from 'recompose';
import { bindActionCreators } from 'multireducer';
import { DesktopScreen, MobileScreen } from 'react-responsive-redux';
import { Helmet } from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import getMetaTags from 'utils/getMetaTags';
import {
  actions as searchActions,
  constants as searchConstants,
} from '@pesposa/client-core/src/store/search';
import { actions as paramsActions } from '@pesposa/client-core/src/store/search/params';
import { selectors as routerSelectors } from '@pesposa/client-core/src/store/router';
import Layout from '@pesposa/client-core/src/layouts/Layout/Layout';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import ListAds from '@pesposa/client-core/src/modules/ListAds/ListAds';
import Search from '@pesposa/client-core/src/modules/Search/Search';
import FetchAdsProgress from '@pesposa/client-core/src/modules/Search/FetchAdsProgress/FetchAdsProgress';
import SearchFilters from '@pesposa/client-core/src/modules/Search/Filters/Filters';
import BackToTopButton from 'components/BackToTopButton/BackToTopButton';
import ShowCreateAdButton from 'modules/PostAd/ShowCreateAdButton/ShowCreateAdButton';
import GetCurrentPosition from 'modules/GetCurrentPosition/GetCurrentPosition';
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
    paddingTop: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5,
    [theme.breakpoints.down(theme.map.tablet)]: {
      paddingTop: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 1.5,
    },
  },
  createAdButtonWrap: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  createAdButton: {
    boxShadow: theme.shadows[7],
    fontSize: theme.typography.subheading.fontSize,
  },
});

const HomeHeader = withProps({ inHome: true })(Header);

const Content = ({
  place,
  category,
  searchParamsFromProps,
  location,
  classes,
}) => (
  <React.Fragment>
    <Helmet
      {...getMetaTags({
        title: getTitle({ place, category }),
        description:
          'Sell your stuff quickly and connect with thousands of buyers. Find cars, houses, electronics and much more, near your location.',
        path: location.pathname,
      })}
    />
    <Search
      params={searchParamsFromProps}
      mapParamsToUrl={({ category: cat }) => (cat ? `/c/${cat}` : '/')}
    >
      {props => (
        <React.Fragment>
          <ListAds {...props} />
          <FetchAdsProgress />
          <MobileScreen className={classes.createAdButtonWrap}>
            <ShowCreateAdButton className={classes.createAdButton}>
              Sell
            </ShowCreateAdButton>
          </MobileScreen>
        </React.Fragment>
      )}
    </Search>
    <ReduxModal id="searchFilters" content={SearchFilters} direction="down" />
  </React.Fragment>
);

const Home = props => {
  const { classes } = props;

  return (
    <GetCurrentPosition>
      <React.Fragment>
        <DesktopScreen>
          <Layout
            header={<HomeHeader />}
            sidebar={<SearchFilters />}
            pageClassName={classes.page}
            flex
          >
            <Content {...props} />
            <BackToTopButton />
          </Layout>
        </DesktopScreen>
        <MobileScreen>
          <Layout header={<HomeHeader />} pageClassName={classes.page} flex>
            <Content {...props} />
          </Layout>
        </MobileScreen>
      </React.Fragment>
    </GetCurrentPosition>
  );
};

export const searchParamsFromPropsSelector = createSelector(
  R.compose(
    R.defaultTo(null),
    routerSelectors.routeParamSelector('category'),
  ),
  category => ({
    category,
    sold: '-true',
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
  withProps(
    createStructuredSelector({
      searchParamsFromProps: searchParamsFromPropsSelector,
      category: routerSelectors.routeParamSelector('category'),
    }),
  ),
  withStyles(styles),
)(Home);
