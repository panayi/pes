import React, { Component } from 'react';
import * as R from 'ramda';
import { withStyles } from 'material-ui/styles';
import { actions as searchUserActions } from 'store/search/user';
import connectSearch from 'components/hocs/connectSearch';
import ProfileBanner from 'components/molecules/ProfileBanner';
import ListAds from 'components/organisms/ListAds';

const styles = theme => ({
  userAds: {
    marginTop: 3 * theme.spacing.unit,
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
