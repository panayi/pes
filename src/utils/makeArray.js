import * as R from 'ramda';

export default R.unless(R.is(Array), R.of);
