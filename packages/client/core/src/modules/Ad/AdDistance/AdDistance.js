import * as R from 'ramda';
import { withProps } from 'recompose';
import roundToClosestMultiple from '@pesposa/core/src/utils/roundToClosestMultiple';
import AdProp from '../AdProp/AdProp';

const METERS_PER_KM = 1000;

const VERY_CLOSE = 750;
const CLOSE = 5000;

const VERY_CLOSE_FIDELITY = 250;
const CLOSE_FIDELITY = 500;
const FAR_FIDELITY = 1000;

const getDistance = ad => {
  const distance = R.path(['_rankingInfo', 'geoDistance'], ad);

  if (R.isNil(distance) || distance === 0) {
    return null;
  }

  if (distance < VERY_CLOSE) {
    const rounded = roundToClosestMultiple(distance, VERY_CLOSE_FIDELITY);
    return `<${rounded}m`;
  }

  if (distance < CLOSE) {
    const rounded = roundToClosestMultiple(distance, CLOSE_FIDELITY);
    return `<${rounded / METERS_PER_KM}km`;
  }

  const rounded = roundToClosestMultiple(distance, FAR_FIDELITY);
  return `${rounded / METERS_PER_KM}km`;
};

export default withProps({ getProp: getDistance })(AdProp);
