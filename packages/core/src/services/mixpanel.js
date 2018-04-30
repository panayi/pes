import mixpanel from 'mixpanel';
import env from '../config/env';

mixpanel.init(env.mixpanelToken);

export default mixpanel;
