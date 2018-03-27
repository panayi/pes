import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as userInfoActions } from 'store/userInfo';

export class GetCurrentPosition extends Component {
  componentDidMount() {
    this.getCurrentPosition();
  }

  getCurrentPosition = async () => {
    if (this.status) {
      return;
    }

    const { getCurrentLocation } = this.props;

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

const mapDispatchToProps = {
  getCurrentLocation: userInfoActions.getCurrentLocation,
};

export default connect(null, mapDispatchToProps)(GetCurrentPosition);
