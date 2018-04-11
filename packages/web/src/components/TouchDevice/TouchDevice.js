import React from 'react';
import { withState } from 'recompose';

export class TouchDevice extends React.Component {
  componentDidMount() {
    window.addEventListener('touchstart', this.handleTouchStart, false);
  }

  handleTouchStart = () => {
    this.props.setIsTouch(true);
    window.removeEventListener('touchstart', this.handleTouchStart, false);
  };

  renderOnTouchDevice = node => this.props.isTouch ? node : null;

  renderOnNonTouchDevice = node => this.props.isTouch ? null : node;

  render() {
    return this.props.children({
      show: this.renderOnTouchDevice,
      hide: this.renderOnNonTouchDevice,
    });
  }
}

export default withState('isTouch', 'setIsTouch', false)(TouchDevice);
