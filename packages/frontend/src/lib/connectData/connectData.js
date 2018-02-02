import * as R from 'ramda';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

const QUERIES_PROP = '__queries__';

export default (dataConnections, mapStateToProps, mapDispatchToProps) => {
  const finalMapStateToProps = (state, props) => {
    const queries = R.compose(
      R.map(R.when(R.is(Function), query => query(state, props))),
      R.pluck('query'),
    )(dataConnections);

    const data = R.compose(
      R.map(selector => selector(state, props)),
      R.pluck('selector'),
    )(dataConnections);

    const resolveProps = R.is(Function, mapStateToProps)
      ? mapStateToProps(state, props)
      : {};

    return {
      ...resolveProps,
      ...data,
      [QUERIES_PROP]: queries,
    };
  };

  return R.compose(
    connect(finalMapStateToProps, mapDispatchToProps),
    firebaseConnect(R.propOr([], QUERIES_PROP)),
  );
};
