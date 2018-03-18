import React from 'react';
import * as R from 'ramda';
import { isNotNil, isNilOrEmpty } from 'ramda-adjunct';
import { withProps, setStatic, branch } from 'recompose';
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
import withProfileData from 'hocs/withProfileData';
import Profile, { searchParamsByTabSelector } from 'modules/Profile/Profile';
import Header from 'pages/components/Header/Header';

const ProfilePage = ({ userId, tab, displayName }) => (
  <Layout header={Header} fixed flex>
    <Helmet
      {...getMetaTags({ title: `${displayName} is selling stuff on Pesposa` })}
    />
    <Profile userId={userId} tab={tab} />
  </Layout>
);

export default R.compose(
  setStatic('getInitialProps', async ({ store, match }) => {
    const { tab, userId } = match.params;
    const currentUserId = authSelectors.uidSelector(store.getState());
    const actions = bindActionCreators(
      {
        loadFirstPage: searchActions.loadFirstPage,
        setParamsFromProps: paramsActions.setParamsFromProps,
      },
      store.dispatch,
      searchConstants.PROFILE_SEARCH_ID,
    );

    if (isNilOrEmpty(userId) && isNilOrEmpty(currentUserId)) {
      return store.getState();
    }

    const isCurrentUser = isNilOrEmpty(userId);
    if (isCurrentUser) {
      await store.firebase.promiseEvents([
        {
          path: models.favorites.all.query(store.getState()).path,
          type: 'once',
        },
      ]);
    } else {
      await store.firebase.promiseEvents([
        {
          path: models.users
            .one(propSelector('userId'))
            .query(store.getState(), { userId }).path,
          type: 'once',
        },
      ]);
    }

    const finalUserId = userId || currentUserId;
    const searchParamsFromProps = searchParamsByTabSelector(store.getState(), {
      tab,
      userId: finalUserId,
    });
    actions.setParamsFromProps(searchParamsFromProps);

    await actions.loadFirstPage();

    return store.getState();
  }),
  withProps(
    createStructuredSelector({
      userId: routerSelectors.routeParamSelector('userId'),
      tab: routerSelectors.routeParamSelector('tab'),
    }),
  ),
  branch(
    R.propSatisfies(isNotNil, 'userId'),
    withProfileData(
      {
        displayName: ['displayName'],
      },
      propSelector('userId'),
    ),
  ),
)(ProfilePage);
