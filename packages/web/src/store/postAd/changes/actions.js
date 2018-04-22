import { createAction } from 'redux-actions';
import * as types from './types';

export const adCreated = createAction(types.AD_CREATED);

export const adDeleted = createAction(types.AD_DELETED);
