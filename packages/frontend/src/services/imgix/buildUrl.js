/* @flow */
import createCachedSelector from 're-reselect';
import client from './client';

// buildUrl :: Image, Object -> String
const buildUrl = createCachedSelector(
  path => path,
  (path, options) => options,
  (path, options) => client.buildURL(path, options),
)(path => path);

export default buildUrl;
