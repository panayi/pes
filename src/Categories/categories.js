import R from 'ramda';
import { DATA_PATH } from '../Firebase/firebase';

// ------------------------------------
// Selectors
// ------------------------------------

// categoriesSelector :: State -> Object
export const categoriesSelector = R.path([...DATA_PATH, 'categories']);
