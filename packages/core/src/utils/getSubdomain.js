import * as R from 'ramda';

const getSubdomain = req => {
  const host = req.headers['x-forwarded-host'] || req.get('host');
  return R.compose(R.head, R.split('.'))(host);
};

export default getSubdomain;
