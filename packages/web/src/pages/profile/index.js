import React from 'react';
import * as R from 'ramda';
import { isNotNil } from 'ramda-adjunct';
import { withProps, setStatic, branch } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { models } from 'store/firebase/data';
import { selectors as routerSelectors } from 'store/router';
import getMetaTags from 'utils/getMetaTags';
import Layout from 'layouts/Layout/Layout';
import withProfileData from 'hocs/withProfileData';
import Profile from 'modules/Profile/Profile';
import Header from 'pages/components/Header/Header';

const ProfilePage = ({ userId, displayName }) => (
  <Layout header={Header} fixed flex>
    <Helmet
      {...getMetaTags({ title: `${displayName} is selling stuff on Pesposa` })}
    />
    <Profile userId={userId} />
  </Layout>
);

export default R.compose(
  setStatic('getInitialProps', async ({ store, match }) => {
    const { userId } = match.params;

    if (!userId) {
      return;
    }

    await store.firebase.promiseEvents([
      {
        path: models.users
          .one(propSelector('userId'))
          .query(store.getState(), { userId }),
        type: 'once',
      },
    ]);
  }),
  withProps(
    createStructuredSelector({
      userId: routerSelectors.routeParamSelector('userId'),
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
