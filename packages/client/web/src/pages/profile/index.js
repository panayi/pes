import React from 'react';
import * as R from 'ramda';
import { withProps, setStatic } from 'recompose';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import { selectors as routerSelectors } from '@pesposa/client-core/src/store/router';
import * as authSelectors from '@pesposa/client-core/src/store/firebase/auth/selectors';
import Layout from '@pesposa/client-core/src/layouts/Layout/Layout';
import UserCoverImage from '@pesposa/client-core/src/modules/User/UserCoverImage/UserCoverImage';
import getMetaTags from 'utils/getMetaTags';
import Profile from 'modules/Profile/Profile';
import Header from 'pages/components/Header/Header';

const ProfilePage = ({ userId, userType, tab, name, location }) => (
  <Layout header={<Header />} fixed flex>
    <UserCoverImage userId={userId} userType={userType}>
      {({ src }) => (
        <Helmet
          {...getMetaTags({
            title: name
              ? `${name} is selling stuff on Pesposa`
              : 'People are selling stuff on Pesposa',
            image: src,
            path: location.pathname,
          })}
        />
      )}
    </UserCoverImage>
    <Profile userId={userId} userType={userType} tab={tab} />
  </Layout>
);

const userTypeSelector = createSelector(
  propSelector(['match', 'path']),
  R.ifElse(
    R.test(/^\/user\/e/),
    R.always(sellerTypes.EXTERNAL_USER),
    R.always(sellerTypes.USER),
  ),
);

export default R.compose(
  setStatic('getInitialProps', async ({ store, match }) => {
    const { userId } = match.params;
    const userType = userTypeSelector({ match });
    const state = store.getState();
    const props = {
      userId,
      userType,
    };
    await store.firebase.promiseEvents([
      {
        path: models
          .profiles(propSelector('userId'), propSelector('userType'))
          .query(state, props).path,
        type: 'once',
      },
      {
        path: models
          .avatars(propSelector('userId'), propSelector('userType'))
          .query(state, props).path,
        type: 'once',
      },
      {
        path: models.sellerAds(propSelector('userId')).all.query(state, props)
          .path,
        type: 'once',
      },
    ]);

    return store.getState();
  }),
  withProps(
    createStructuredSelector({
      userId: routerSelectors.routeParamSelector('userId'),
      userType: userTypeSelector,
      tab: routerSelectors.routeParamSelector('tab'),
    }),
  ),
  connect(
    createStructuredSelector({
      currentUserId: authSelectors.uidSelector,
    }),
  ),
)(ProfilePage);
