import React from 'react';
import { isFunction } from 'ramda-adjunct';
import { track } from '../../../services/mixpanel';

export class TrackEvent extends React.Component {
  track = (callback, eventId, eventProps) => (...args) => {
    callback(...args);
    const finalEventProps = isFunction(eventProps)
      ? eventProps(...args)
      : eventProps;
    track(eventId, finalEventProps);
  };

  render() {
    const { children } = this.props;
    return children({
      track: this.track,
    });
  }
}

export default TrackEvent;
