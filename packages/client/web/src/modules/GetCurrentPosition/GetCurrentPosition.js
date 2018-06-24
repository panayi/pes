import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as userInfoActions } from '@pesposa/client-core/src/store/userInfo';

export class GetCurrentPosition extends Component {
  status = null;

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

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

const mapDispatchToProps = {
  getCurrentLocation: userInfoActions.getCurrentLocation,
};

export default connect(
  null,
  mapDispatchToProps,
)(GetCurrentPosition);
