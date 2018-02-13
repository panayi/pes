import React, { Component } from 'react';
import * as R from 'ramda';
import { withStyles } from 'material-ui/styles';
import { actions as searchUserActions } from 'store/search/user';
import connectSearch from 'components/hocs/connectSearch';
import ProfileBanner from 'components/molecules/ProfileBanner';
import ListAds from 'components/organisms/ListAds';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  userAds: {
    flex: 1,
    padding: [3 * theme.spacing.unit, 3 * theme.spacing.unit, 0],
    marginBottom: -1.5 * theme.spacing.unit,
    boxShadow: theme.shadows[1],
    background: theme.palette.grey[100],
  },
});

class Profile extends Component {
  componentWillMount() {
    const { setUser, userId } = this.props;
    setUser(userId);
  }

  render() {
    const { userId, classes } = this.props;

    return (
      <React.Fragment>
        <ProfileBanner userId={userId} />
        <div className={classes.userAds}>
          <ListAds sidebarWidth={0} />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  setUser: searchUserActions.setUser,
};

export default R.compose(
  connectSearch(null, mapDispatchToProps),
  withStyles(styles),
)(Profile);
