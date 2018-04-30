import mixpanel from 'mixpanel';
import env from '../config/env';

const client = mixpanel.init(env.mixpanelToken);

export default client;
