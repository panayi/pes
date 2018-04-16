import * as R from 'ramda';
import PropTypes from 'prop-types';
import { getContext, withProps } from 'recompose';

const trackCallback = (callbackKey, eventName, eventProps) =>
  R.compose(
    getContext({
      mixpanel: PropTypes.shape(),
    }),
    withProps(props => ({
      [callbackKey]: (...args) => {
        const callback = props[callbackKey];
        const { mixpanel } = props;

        if (mixpanel) {
          mixpanel.track(eventName, eventProps);
        }

        callback(...args);
      },
    })),
  );

export default trackCallback;
