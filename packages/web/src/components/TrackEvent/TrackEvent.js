import React from 'react';
import { MixpanelContext } from 'components/MixpanelProvider/MixpanelProvider';

export class TrackEvent extends React.Component {
  track = mixpanel => (callback, eventName, eventProps) => (...args) => {
    callback(...args);
    mixpanel.track(eventName, eventProps);
  };

  render() {
    return (
      <MixpanelContext.Consumer>
        {mixpanel =>
          this.props.children({
            track: this.track(mixpanel),
          })
        }
      </MixpanelContext.Consumer>
    );
  }
}

export default TrackEvent;
