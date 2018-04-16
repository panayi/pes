import React from 'react';
import PropTypes from 'prop-types';
import { getContext } from 'recompose';

export class TrackEvent extends React.Component {
  track = (callback, eventName, eventProps) => (...args) => {
    callback(...args);
    this.props.mixpanel.track(eventName, eventProps);
  };

  render() {
    return this.props.children({
      track: this.track,
    });
  }
}

export default getContext({
  mixpanel: PropTypes.shape(),
})(TrackEvent);
