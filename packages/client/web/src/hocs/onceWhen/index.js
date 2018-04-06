import * as R from 'ramda';
import { lifecycle } from 'recompose';

const onceWhen = (fn, predicate) => {
  const maybeRun = (props, callback) => {
    if (predicate(props)) {
      callback(props);
    }
  };

  return lifecycle({
    componentDidMount() {
      this.__fn = R.once(fn);
      maybeRun(this.props, this.__fn);
    },

    componentDidUpdate() {
      maybeRun(this.props, this.__fn);
    },
  });
};

export default onceWhen;
