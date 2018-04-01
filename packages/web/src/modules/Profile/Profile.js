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
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import { selectors as authSelectors } from 'store/firebase/auth';
import { constants as searchConstants } from 'store/search';
import needsUser from 'hocs/needsUser';
import SearchProvider from 'modules/Search/Provider/Provider';
import ProfileBanner from './ProfileBanner/ProfileBanner';
import ListUserAds from './ListUserAds/ListUserAds';

const styles = theme => ({
  root: {
    [theme.breakpoints.up(theme.map.laptop)]: {
      margin: [theme.spacing.unit, 0, theme.spacing.unit * 3, 0],
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
    const { userId, isCurrentUser } = this.props;
    const basePath = isCurrentUser ? '/profile' : `/user/${userId}`;
    const path = value === 'selling' ? basePath : `${basePath}/${value}`;
    this.props.history.push(path);
  };

  render() {
    const { userId, currentUserId, tab, searchParams, classes } = this.props;
    const currentTab = tab || 'selling';
    const isCurrentUser = userId === currentUserId;

    return (
      <SearchProvider id={searchConstants.PROFILE_SEARCH_ID}>
        <div className={classes.root}>
          <ProfileBanner userId={userId} />
          <div className={classes.tabsWrap}>
            <Tabs
              className={classes.tabs}
              value={currentTab}
              onChange={this.handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Selling" value="selling" />
              <Tab label="Sold" value="sold" />
              {isCurrentUser && <Tab label="Favorites" value="favorites" />}
            </Tabs>
            <div className={classes.list}>
              <ListUserAds params={searchParams} />
            </div>
          </div>
        </div>
      </SearchProvider>
    );
  }
}

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
    } else if (tab === 'favorites') {
      return {
        ids: isNilOrEmpty(favoriteAds) ? ['dummy'] : R.pluck('id', favoriteAds),
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
});

export default R.compose(
  branch(R.compose(isNilOrEmpty, R.prop('userId')), needsUser()),
  connect(mapStateToProps),
  withProps(({ userId, currentUserId }) => ({
    isCurrentUser: isNilOrEmpty(userId),
    userId: userId || currentUserId,
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
