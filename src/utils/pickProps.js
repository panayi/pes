import * as R from 'ramda';
import { mapProps } from 'recompose';

export default R.compose(mapProps, R.pick);
