import * as R from 'ramda';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import * as constants from './constants';

const QUERIES_PROP = '__queries__';

const connectData = (dataConnections, mapStateToProps, mapDispatchToProps) => {
  const finalMapStateToProps = R.isNil(dataConnections)
    ? mapStateToProps
    : (state, props) => {
        const data = R.compose(
          R.map(selector => selector(state, props)),
          R.pluck('selector'),
        )(dataConnections);

        const propsWithData = R.merge(props, data);

        const queries = R.compose(
          R.reject(R.propEq('path', constants.INVALID_PATH)),
          R.map(R.when(R.is(Function), query => query(state, propsWithData))),
          R.values,
          R.pluck('query'),
        )(dataConnections);

        const resolveProps = R.is(Function, mapStateToProps)
          ? mapStateToProps(state, props)
          : {};

        const isDataLoaded = R.map(isLoaded, data);
        const allDataLoaded = R.compose(
          R.all(R.identity),
          R.values,
        )(isDataLoaded);

        return {
          ...resolveProps,
          ...data,
          isLoaded: isDataLoaded,
          allDataLoaded,
          [QUERIES_PROP]: queries,
        };
      };

  return R.compose(
    connect(
      finalMapStateToProps,
      mapDispatchToProps,
    ),
    firebaseConnect(R.propOr([], QUERIES_PROP)),
  );
};

export default connectData;
