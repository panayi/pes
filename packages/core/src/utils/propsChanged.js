import * as R from 'ramda';

// propsChanged :: [String], Object, Object -> Boolean
const propsChanged = (propKeys, props, nextProps) =>
  R.useWith(R.complement(R.equals), [
    R.compose(
      R.pick(propKeys),
      R.defaultTo({}),
    ),
    R.compose(
      R.pick(propKeys),
      R.defaultTo({}),
    ),
  ])(props, nextProps);

export default propsChanged;
