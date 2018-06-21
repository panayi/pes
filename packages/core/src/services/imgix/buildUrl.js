import { isNilOrEmpty } from 'ramda-adjunct';
import createCachedSelector from 're-reselect';
import client from './client';

// buildUrl :: ImagePath, Params -> String
//  ImagePath = String
//  Params = Object
const buildUrl = createCachedSelector(
  path => path,
  (path, params) => params,
  (path, params) => (isNilOrEmpty(path) ? null : client.buildURL(path, params)),
)(path => path);

export default buildUrl;
