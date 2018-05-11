import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { branch, withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import Tabs, { Tab } from 'material-ui/Tabs';
import withStyles from 'material-ui/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { actions as modalActions } from 'store/modals';
import { selectors as authSelectors } from 'store/firebase/auth';
import { constants as searchConstants } from 'store/search';
import { selectors as changesSelectors } from 'store/postAd/changes';
import needsUser from 'hocs/needsUser';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import SearchProvider from 'modules/Search/Provider/Provider';
import ProfileBanner from './ProfileBanner/ProfileBanner';
import PendingReviewAdStatus from './PendingReviewAdStatus/PendingReviewAdStatus';
import ListFavoriteAds from './ListFavoriteAds/ListFavoriteAds';
import ListPendingAds from './ListPendingAds/ListPendingAds';
import ListUserAds from './ListUserAds/ListUserAds';

const mapTabToContent = {
  pending: ListPendingAds,
  selling: ListUserAds,
  sold: ListUserAds,
  favorites: ListFavoriteAds,
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
      background: theme.palette.common.white,
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
    const { userId, tab } = this.props;
    const basePath = `/user/${userId}`;

    if (value === tab) {
      return;
    }

    const path = value === 'selling' ? basePath : `${basePath}/${value}`;
    this.props.history.push(path);
  };

  render() {
    const { userId, tab, isCurrentUser, createdAds, classes } = this.props;

    const TabContent = mapTabToContent[tab];

    return (
      <SearchProvider id={searchConstants.PROFILE_SEARCH_ID}>
        <div className={classes.root}>
          <ProfileBanner userId={userId} />
          <div className={classes.tabsWrap}>
            <Tabs
              className={classes.tabs}
              value={tab}
              onChange={this.handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              {isCurrentUser && !isNilOrEmpty(createdAds) ? (
                <Tab label="Pending" value="pending" />
              ) : null}
              <Tab label="Selling" value="selling" />
              <Tab label="Sold" value="sold" />
              {isCurrentUser ? (
                <Tab label="Favorites" value="favorites" />
              ) : null}
            </Tabs>
            <div className={classes.list}>
              <TabContent
                userId={userId}
                isCurrentUser={isCurrentUser}
                sold={tab === 'sold'}
                createdAds={createdAds}
              />
            </div>
          </div>
          <ReduxModal
            id="pendingReviewAdStatus"
            content={PendingReviewAdStatus}
          />
        </div>
      </SearchProvider>
    );
  }
}

const tabSelector = createSelector(
  propSelector('tab'),
  propSelector('createdAds'),
  (tab, createdAds) => {
    if (isNilOrEmpty(tab)) {
      return 'selling';
    }

    if (tab === 'pending' && isNilOrEmpty(createdAds)) {
      return 'selling';
    }

    return tab;
  },
);

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
  createdAds: changesSelectors.createdAdsSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  branch(R.compose(isNilOrEmpty, R.prop('userId')), needsUser()),
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ tab, userId, currentUserId, createdAds, openModal }) => ({
    tab: tabSelector({ tab, createdAds }),
    isCurrentUser: userId === currentUserId,
    createdAds: R.map(
      ad =>
        R.assoc(
          'onClick',
          () => openModal('pendingReviewAdStatus', { ad }),
          ad,
        ),
      createdAds,
    ),
  })),
  withRouter,
  withStyles(styles),
)(Profile);
