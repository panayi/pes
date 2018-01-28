import * as R from 'ramda';
import { lifecycle } from 'recompose';

export default (fn, predicate) => {
  const maybeRun = (props, callback) => {
    if (predicate(props)) {
      callback(props);
    }
  };

  return lifecycle({
    componentWillMount() {
      this.__fn = R.once(fn);
      maybeRun(this.props, this.__fn);
    },

    componentWillReceiveProps(nextProps) {
      maybeRun(nextProps, this.__fn);
    },
  });
};
