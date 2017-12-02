import * as R from 'ramda';

// zipArgs :: [a1, a2, ..., aN] -> (b1, b2, ..., bN) -> { a1: b1, a2: b2, ..., aN: bN }
export default keys => R.compose(R.zipObj(keys), R.unapply(R.identity));
