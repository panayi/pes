import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty, noop } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { branch, withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import Tabs, { Tab } from 'material-ui/Tabs';
import withStyles from 'material-ui/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import { actions as modalActions } from 'store/modals';
import { selectors as authSelectors } from 'store/firebase/auth';
import { constants as searchConstants } from 'store/search';
import { selectors as changesSelectors } from 'store/postAd/changes';
import needsUser from 'hocs/needsUser';
import ListAds from 'components/ListAds/ListAds';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import SearchProvider from 'modules/Search/Provider/Provider';
import ProfileBanner from './ProfileBanner/ProfileBanner';
import ListUserAds from './ListUserAds/ListUserAds';
import PendingReviewAdStatus from './PendingReviewAdStatus/PendingReviewAdStatus';
import NoResults from './NoResults/NoResults';

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
    const {
      userId,
      searchParams,
      tab,
      isCurrentUser,
      createdAds,
      classes,
    } = this.props;
    const noResults = (
      <NoResults tab={tab} isCurrentUser={isCurrentUser} userId={userId} />
    );

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
              {tab === 'pending' ? (
                <ListAds
                  hits={createdAds}
                  loadNextPage={noop}
                  noResults={noResults}
                />
              ) : (
                <ListUserAds params={searchParams} noResults={noResults} />
              )}
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

export const searchParamsByTabSelector = createSelector(
  propSelector('tab'),
  propSelector('userId'),
  models.favorites.all.selector,
  (tab, userId, favoriteAds) => {
    if (tab === 'sold') {
      return {
        user: userId,
        sold: true,
        ids: null,
      };
    }

    if (tab === 'favorites') {
      return {
        ids: isNilOrEmpty(favoriteAds) ? ['dummy'] : R.pluck('id', favoriteAds),
      };
    }

    if (tab === 'pending') {
      return {
        ids: ['dummy'],
      };
    }

    return {
      user: userId,
      sold: false,
      ids: null,
    };
  },
);

const mapDataToProps = {
  favoriteAds: models.favorites.all,
};

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
  branch(R.prop('isCurrentUser'), connectData(mapDataToProps)),
  connect(
    createStructuredSelector({
      searchParams: searchParamsByTabSelector,
    }),
  ),
  withRouter,
  withStyles(styles),
)(Profile);
