import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { branch, withProps, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import { selectors as authSelectors } from 'store/firebase/auth';
import { constants as searchConstants } from 'store/search';
import needsUser from 'hocs/needsUser';
import SearchProvider from 'components/SearchProvider/SearchProvider';
import ProfileBanner from './ProfileBanner/ProfileBanner';
import ListUserAds from './ListUserAds/ListUserAds';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    flex: 1,
    minHeight: 300,
    boxShadow: theme.shadows[1],
    background: theme.palette.grey[100],
    borderRadius: [0, 0, theme.borderRadius.xl, theme.borderRadius.xl],
  },
  list: {
    padding: [3 * theme.spacing.unit, 3 * theme.spacing.unit, 0],
  },
});

class Profile extends Component {
  handleChangeTab = (event, value) => {
    this.props.setCurrentTab(value);
  };

  render() {
    const { userId, currentTab, classes } = this.props;
    console.log(userId);
    return (
      <SearchProvider id={searchConstants.PROFILE_SEARCH_ID}>
        <div>
          <ProfileBanner userId={userId} />
          <div className={classes.tabs}>
            <Tabs
              value={currentTab}
              onChange={this.handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Selling" />
              <Tab label="Sold" />
            </Tabs>
            <div className={classes.list}>
              <ListUserAds userId={userId} currentTab={currentTab} />
            </div>
          </div>
        </div>
      </SearchProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
});

export default R.compose(
  branch(R.compose(isNilOrEmpty, R.prop('userId')), needsUser()),
  withState('currentTab', 'setCurrentTab', 0),
  connect(mapStateToProps),
  withProps(({ userId, currentUserId }) => ({
    userId: userId || currentUserId,
  })),
  withStyles(styles),
)(Profile);
