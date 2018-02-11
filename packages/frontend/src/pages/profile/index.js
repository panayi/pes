import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { branch } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as routerSelectors } from 'store/router';
import needsUser from 'components/hocs/needsUser';
import Page from 'components/atoms/Page';
import ProfileBanner from 'components/molecules/ProfileBanner';
import Layout from 'components/organisms/Layout';
import ListAds from 'components/organisms/ListAds';

// const HITS_PER_PAGE = 12;

const styles = theme => ({
  userAds: {
    marginTop: 3 * theme.spacing.unit,
  },
});

export const Profile = ({ userId, currentUserId, classes }) => (
  <Layout
  // configureSearch={
  //   <Configure
  //     facetFilters={`user:${userId || currentUserId}`}
  //     hitsPerPage={HITS_PER_PAGE}
  //   />
  // }
  >
    <Page fixed>
      <ProfileBanner userId={userId || currentUserId} />
      <div className={classes.userAds}>
        <ListAds sidebarWidth={0} />
      </div>
    </Page>
  </Layout>
);

const userIdSelector = routerSelectors.routeParamSelector('userId');

const mapStateToProps = createStructuredSelector({
  userId: userIdSelector,
  currentUserId: authSelectors.uidSelector,
});

export default R.compose(
  connect(mapStateToProps),
  branch(R.compose(isNilOrEmpty, R.prop('userId')), needsUser()),
  withStyles(styles),
)(Profile);
