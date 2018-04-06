import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { branch, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import needsUser from '@pesposa/client-core/src/hocs/needsUser';
import ProfileBanner from './ProfileBanner/ProfileBanner';
import UserFavoriteAds from './UserFavoriteAds/UserFavoriteAds';
import UserAds from './UserAds/UserAds';

const mapTabToContent = {
  selling: UserAds,
  sold: UserAds,
  favorites: UserFavoriteAds,
};

const styles = theme => ({
  root: {
    // fixes sluggish scrolling
    transform: 'translateZ(0)',
    [theme.breakpoints.up(theme.map.laptop)]: {
      padding: [theme.spacing.unit, 0, theme.spacing.unit * 3, 0],
    },
  },
  tabsWrap: {
    flex: 1,
    minHeight: 300,
    [theme.breakpoints.up(theme.map.laptop)]: {
      boxShadow: theme.shadows[1],
      background: theme.palette.background.default,
      borderRadius: [0, 0, theme.borderRadius.xl, theme.borderRadius.xl],
    },
  },
  tabs: {
    borderBottom: [1, 'solid', theme.palette.divider],
  },
  list: {
    padding: [3 * theme.spacing.unit, 3 * theme.spacing.unit, 0],
  },
});

class Profile extends Component {
  handleChangeTab = (event, value) => {
    const { userId, userType, tab } = this.props;
    const basePath =
      userType === sellerTypes.EXTERNAL_USER
        ? `/user/e/${userId}`
        : `/user/${userId}`;

    if (value === tab) {
      return;
    }

    const path = value === 'selling' ? basePath : `${basePath}/${value}`;
    this.props.history.push(path);
  };

  render() {
    const { userId, userType, tab, isCurrentUser, classes } = this.props;

    const TabContent = mapTabToContent[tab];

    return (
      <div className={classes.root}>
        <ProfileBanner userId={userId} userType={userType} />
        <div className={classes.tabsWrap}>
          <Tabs
            className={classes.tabs}
            value={tab}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Selling" value="selling" />
            <Tab label="Sold" value="sold" />
            {isCurrentUser ? <Tab label="Favorites" value="favorites" /> : null}
          </Tabs>
          <div className={classes.list}>
            <TabContent
              userId={userId}
              userType={userType}
              isCurrentUser={isCurrentUser}
              sold={tab === 'sold'}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  branch(R.compose(isNilOrEmpty, R.prop('userId')), needsUser()),
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ tab, userId, currentUserId }) => ({
    tab: R.defaultTo('selling', tab),
    isCurrentUser: userId === currentUserId,
  })),
  withRouter,
  withStyles(styles),
)(Profile);
