import mixpanel from 'mixpanel-browser';
import env from '@pesposa/core/src/config/env';
import mixpanelEvents from '@pesposa/core/src/config/mixpanelEvents';

mixpanel.init(env.mixpanelToken);

export const track = (eventId, ...rest) => {
  const eventName = mixpanelEvents[eventId];
  return mixpanel.track(eventName, ...rest);
};

export default mixpanel;
