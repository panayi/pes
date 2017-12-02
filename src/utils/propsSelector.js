import * as R from 'ramda';

export default R.compose(R.defaultTo({}), R.last, R.unapply(R.identity));
