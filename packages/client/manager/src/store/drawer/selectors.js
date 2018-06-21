import * as R from 'ramda';

const drawerPath = ['drawer'];

export const isOpenedSelector = R.path(drawerPath);
