/* @flow */
import * as R from 'ramda';
import { withProps } from 'recompose';
import AdProp from '../AdProp';

const getDistance = ad => {
  const distance = R.path(['_rankingInfo', 'geoDistance'], ad);

  if (R.isNil(distance) || distance === 0) {
    return null;
  }

  if (distance < 750) {
    const rounded = 250 * Math.ceil(distance / 250);
    return `< ${rounded}m`;
  }

  if (distance < 5000) {
    const rounded = 500 * Math.ceil(distance / 500);
    return `< ${rounded / 1000}km`;
  }

  const rounded = 1000 * Math.ceil(distance / 1000);
  return `${rounded / 1000}km`;
};

export default withProps({ getProp: getDistance })(AdProp);
