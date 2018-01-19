import * as R from 'ramda';

const computedProp = R.curry((key, computer, obj) =>
  R.converge(R.assoc(key), [computer, R.identity])(obj),
);

export default computedProp;
