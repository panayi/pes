import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { branch, withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import { selectors as authSelectors } from 'store/firebase/auth';
import { constants as searchConstants } from 'store/search';
import needsUser from 'hocs/needsUser';
import SearchProvider from 'components/SearchProvider/SearchProvider';
import ListAds from 'components/ListAds/ListAds';
import ProfileBanner from './ProfileBanner/ProfileBanner';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  userAds: {
    flex: 1,
    minHeight: 300,
    padding: [3 * theme.spacing.unit, 3 * theme.spacing.unit, 0],
    marginBottom: -1.5 * theme.spacing.unit,
    boxShadow: theme.shadows[1],
    background: theme.palette.grey[100],
    borderRadius: [0, 0, theme.borderRadius.xl, theme.borderRadius.xl],
  },
});

const ProfilePage = ({ userId, classes }) => (
  <SearchProvider id={searchConstants.PROFILE_SEARCH_ID}>
    <div>
      <ProfileBanner userId={userId} />
      <div className={classes.userAds}>
        <ListAds userId={userId} sidebarWidth={0} />
      </div>
    </div>
  </SearchProvider>
);

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
});

export default R.compose(
  branch(R.compose(isNilOrEmpty, R.prop('userId')), needsUser()),
  connect(mapStateToProps),
  withProps(({ userId, currentUserId }) => ({
    userId: userId || currentUserId,
  })),
  withStyles(styles),
)(ProfilePage);
