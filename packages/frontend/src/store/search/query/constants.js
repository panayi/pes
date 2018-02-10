import * as R from 'ramda';
import * as searchConstants from '../constants';

export const ROOT_KEY = 'query';

export const ROOT_PATH = [searchConstants.ROOT_KEY, ROOT_KEY];

export const MODEL_PATH = R.join('.', ROOT_PATH);
