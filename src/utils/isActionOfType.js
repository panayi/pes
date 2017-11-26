import * as R from 'ramda';

// isActionOfType -> ActionType -> Action -> Boolean
export default R.useWith(R.equals, [
  R.identity,
  R.prop('type'),
]);
