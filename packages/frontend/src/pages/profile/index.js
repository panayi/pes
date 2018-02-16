import React from 'react';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { selectors as routerSelectors } from 'store/router';
import Layout from 'layouts/Layout/Layout';
import Profile from 'modules/Profile/Profile';

const ProfilePage = ({ userId }) => (
  <Layout fixed flex>
    <Profile userId={userId} />
  </Layout>
);

export default withProps(
  createStructuredSelector({
    userId: routerSelectors.routeParamSelector('userId'),
  }),
)(ProfilePage);
