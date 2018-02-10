import { createAction } from 'redux-actions';
import * as types from './types';

export const receiveHits = createAction(types.RECEIVE_HITS);
