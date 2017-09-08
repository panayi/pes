import R from 'ramda';
import { DATA_PATH } from '../Firebase/firebase';

// ------------------------------------
// Selectors
// ------------------------------------

// postsSelector :: State -> Object
export const postsSelector = R.path([...DATA_PATH, 'posts']);
