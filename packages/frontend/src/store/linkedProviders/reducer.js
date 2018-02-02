import { handleAction } from 'redux-actions';
import * as constants from './constants';

const initialState = null;

export default handleAction(
  [constants.RECEIVE_LINKED_PROVIDERS],
  (state, { payload }) => payload,
  initialState,
);
