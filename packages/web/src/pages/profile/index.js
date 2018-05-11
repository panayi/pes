import React from 'react';
import * as R from 'ramda';
import { withProps, setStatic } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'multireducer';
import { Helmet } from 'react-helmet';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { models } from 'store/firebase/data';
import {
  actions as searchActions,
  constants as searchConstants,
} from 'store/search';
import { actions as paramsActions } from 'store/search/params';
import { selectors as routerSelectors } from 'store/router';
import * as authSelectors from 'store/firebase/auth/selectors';
import getMetaTags from 'utils/getMetaTags';
import Layout from 'layouts/Layout/Layout';
import needsBetaUser from 'hocs/needsBetaUser';
import withProfileData from 'hocs/withProfileData';
import Profile from 'modules/Profile/Profile';
import Header from 'pages/components/Header/Header';

const ProfilePage = ({ userId, tab, displayName, avatarUrl, location }) => (
  <Layout header={Header} fixed flex>
    <Helmet
      {...getMetaTags({
        title: displayName
          ? `${displayName} is selling stuff on Pesposa`
          : 'People are selling stuff on Pesposa',
        image: avatarUrl,
        path: location.pathname,
      })}
    />
    <Profile userId={userId} tab={tab} />
  </Layout>
);

export default R.compose(
  setStatic('getInitialProps', async ({ store, match }) => {
    const { tab, userId } = match.params;
    const actions = bindActionCreators(
      {
        loadFirstPage: searchActions.loadFirstPage,
        setParamsFromProps: paramsActions.setParamsFromProps,
      },
      store.dispatch,
      searchConstants.PROFILE_SEARCH_ID,
    );

    await store.firebase.promiseEvents([
      {
        path: models
          .profiles(propSelector('userId'))
          .query(store.getState(), { userId }).path,
        type: 'once',
      },
    ]);

    if (!tab || tab === 'selling' || tab === 'sold') {
      const searchParams = {
        user: userId,
        sold: tab === 'sold',
        ids: null,
        category: ' ', // TODO: hacky way to include all categories
      };
      actions.setParamsFromProps(searchParams);
      await actions.loadFirstPage();
    }

    return store.getState();
  }),
  needsBetaUser,
  withProps(
    createStructuredSelector({
      userId: routerSelectors.routeParamSelector('userId'),
      tab: routerSelectors.routeParamSelector('tab'),
    }),
  ),
  connect(
    createStructuredSelector({
      currentUserId: authSelectors.uidSelector,
    }),
  ),
  withProfileData(
    {
      displayName: ['displayName'],
      avatarUrl: ['avatarUrl'],
    },
    R.either(propSelector('userId'), propSelector('currentUserId')),
  ),
)(ProfilePage);
