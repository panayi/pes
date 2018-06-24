import React from 'react';
import { withState } from 'recompose';

export class TouchDevice extends React.Component {
  componentDidMount() {
    window.addEventListener('touchstart', this.handleTouchStart, false);
  }

  handleTouchStart = () => {
    const { setIsTouch } = this.props;
    setIsTouch(true);
    window.removeEventListener('touchstart', this.handleTouchStart, false);
  };

  renderOnTouchDevice = node => {
    const { isTouch } = this.props;
    return isTouch ? node : null;
  };

  renderOnNonTouchDevice = node => {
    const { isTouch } = this.props;
    return isTouch ? null : node;
  };

  render() {
    const { children } = this.props;

    return children({
      show: this.renderOnTouchDevice,
      hide: this.renderOnNonTouchDevice,
    });
  }
}

export default withState('isTouch', 'setIsTouch', false)(TouchDevice);
