import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { branch, withProps, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import { selectors as authSelectors } from 'store/firebase/auth';
import { constants as searchConstants } from 'store/search';
import needsUser from 'hocs/needsUser';
import SearchProvider from 'components/SearchProvider/SearchProvider';
import ProfileBanner from './ProfileBanner/ProfileBanner';
import ListUserAds from './ListUserAds/ListUserAds';

const styles = theme => ({
  root: {
    [theme.breakpoints.up(theme.map.tablet)]: {
      margin: [theme.spacing.unit, 0],
    },
  },
  tabsWrap: {
    flex: 1,
    minHeight: 300,
    [theme.breakpoints.up(theme.map.tablet)]: {
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
    this.props.setCurrentTab(value);
  };

  render() {
    const {
      userId,
      currentUserId,
      favoriteAds,
      currentTab,
      classes,
    } = this.props;
    const isCurrentUser = userId === currentUserId;
    const facetFilters = [
      [`user:${userId}`, 'sold:false'], // Selling
      [`user:${userId}`, 'sold:true'], // Sold
      R.compose(
        R.ifElse(
          R.isEmpty,
          R.always(['objectID:dummy']), // Fetch nothing
          R.of,
        ),
        R.map(({ id }) => `objectID:\\${id}`), // Prefix with '\', since firebase IDs can start with '-'. See why: https://goo.gl/nqPUrG
        R.defaultTo([]),
      )(favoriteAds), // Favorites
    ];

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
              <Tab label="Selling" />
              <Tab label="Sold" />
              {isCurrentUser && <Tab label="Favorites" />}
            </Tabs>
            <div className={classes.list}>
              <ListUserAds facetFilters={facetFilters[currentTab]} />
            </div>
          </div>
        </div>
      </SearchProvider>
    );
  }
}

const mapDataToProps = {
  favoriteAds: models.favorites.all,
};

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
});

export default R.compose(
  branch(R.compose(isNilOrEmpty, R.prop('userId')), needsUser()),
  connect(mapStateToProps),
  branch(
    R.converge(R.compose(R.equals, R.unapply(R.identity)), [
      R.prop('userId'),
      R.prop('currentUserId'),
    ]),
    connectData(mapDataToProps),
  ),
  withState('currentTab', 'setCurrentTab', 0),
  withProps(({ userId, currentUserId }) => ({
    userId: userId || currentUserId,
  })),
  withStyles(styles),
)(Profile);
