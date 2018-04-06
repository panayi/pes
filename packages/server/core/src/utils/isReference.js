import * as R from 'ramda';

// TODO: Is there a safer way to check if the input is a reference?
export default R.propSatisfies(R.is(Function), 'once');
