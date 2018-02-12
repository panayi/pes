import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { branch, withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors as authSelectors } from 'store/firebase/auth';
import { constants as searchConstants } from 'store/search';
import { selectors as routerSelectors } from 'store/router';
import needsUser from 'components/hocs/needsUser';
import Page from 'components/atoms/Page';
import SearchProvider from 'components/organisms/Search/Provider';
import Layout from 'components/organisms/Layout';
import Profile from 'components/organisms/Profile';

const ProfilePage = ({ userId }) => (
  <SearchProvider id={searchConstants.PROFILE_SEARCH_ID}>
    <Layout>
      <Page fixed>
        <Profile userId={userId} />
      </Page>
    </Layout>
  </SearchProvider>
);

const userIdSelector = routerSelectors.routeParamSelector('userId');

const mapStateToProps = createStructuredSelector({
  userId: userIdSelector,
  currentUserId: authSelectors.uidSelector,
});

export default R.compose(
  connect(mapStateToProps),
  branch(R.compose(isNilOrEmpty, R.prop('userId')), needsUser()),
  withProps(({ userId, currentUserId }) => ({
    userId: userId || currentUserId,
  })),
)(ProfilePage);
