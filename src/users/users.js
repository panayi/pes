import R from 'ramda';
import { DATA_PATH } from '../firebase/firebase';

// ------------------------------------
// Selectors
// ------------------------------------

// usersSelector :: State -> Object
export const usersSelector = R.path([...DATA_PATH, 'users']);
