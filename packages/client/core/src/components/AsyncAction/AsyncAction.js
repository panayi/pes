import React from 'react';
import PropTypes from 'prop-types';
import { withStateHandlers } from 'recompose';

const PENDING = 'pending';
const SUCCESS = 'success';
const FAIL = 'fail';

class AsyncAction extends React.Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    status: PropTypes.oneOf([PENDING, SUCCESS, FAIL]),
  };

  static defaultProps = {
    status: null,
  };

  handleActionStart = async (...args) => {
    const { action, start, success, fail } = this.props;
    try {
      start();
      await action(...args);
      success();
    } catch (error) {
      fail(error);
    }
  };

  render() {
    const { children, status } = this.props;

    return children({
      callAction: this.handleActionStart,
      isPending: status === PENDING,
      isSuccess: status === SUCCESS,
      isFail: status === FAIL,
      status,
    });
  }
}

export default withStateHandlers(
  {
    status: null,
    error: null,
  },
  {
    start: () => () => ({
      status: PENDING,
      error: null,
    }),
    success: () => () => ({
      status: SUCCESS,
      error: null,
    }),
    fail: () => error => ({
      status: FAIL,
      error,
    }),
  },
)(AsyncAction);
