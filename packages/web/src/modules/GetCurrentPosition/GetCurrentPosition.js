import React, { Component } from 'react';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions as userInfoActions } from 'store/userInfo';
import { selectors as authSelectors } from 'store/firebase/auth';

const WAIT_TIME = 2000;

export class GetCurrentLocation extends Component {
  state = {
    wait: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ wait: false });
    }, WAIT_TIME);

    this.getCurrentPosition();
  }

  componentDidUpdate() {
    this.getCurrentPosition();
  }

  getCurrentPosition = async () => {
    if (this.status || this.state.wait) {
      return;
    }

    const { uid, token, getCurrentLocation } = this.props;

    // No user
    if (isNilOrEmpty(uid) || isNilOrEmpty(token)) {
      return;
    }

    // SSR?
    if (!process.browser) {
      return;
    }

    this.status = 'pending';

    try {
      await getCurrentLocation();
      this.status = 'success';
    } catch (error) {
      this.status = null;
    }
  };

  status = null;

  render() {
    return React.Children.only(this.props.children);
  }
}

const mapStateToProps = createStructuredSelector({
  uid: authSelectors.uidSelector,
  token: authSelectors.tokenSelector,
});

const mapDispatchToProps = {
  getCurrentLocation: userInfoActions.getCurrentLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(GetCurrentLocation);
