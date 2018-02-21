import React from 'react';
import * as R from 'ramda';
import { withProps, branch } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { propSelector } from 'pesposa-utils';
import { selectors as routerSelectors } from 'store/router';
import Layout from 'layouts/Layout/Layout';
import withProfileData from 'hocs/withProfileData';
import Profile from 'modules/Profile/Profile';
import Header from 'pages/components/Header/Header';

const ProfilePage = ({ userId, displayName }) => (
  <Layout header={Header} fixed flex>
    {displayName && (
      <Helmet>
        <title>{displayName} is selling stuff on Pesposa</title>
      </Helmet>
    )}
    <Profile userId={userId} />
  </Layout>
);

export default withProps(
  createStructuredSelector({
    userId: routerSelectors.routeParamSelector('userId'),
  }),
  branch(
    R.complement(R.isNil('userId')),
    withProfileData(
      {
        displayName: ['displayName'],
      },
      propSelector('userId'),
    ),
  ),
)(ProfilePage);
