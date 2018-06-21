import requestIp from 'request-ip';

const getClientIp = req =>
  req.headers['fastly-client-ip'] || requestIp.getClientIp(req);

export default getClientIp;
