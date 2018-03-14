import * as R from 'ramda';
import { isPlainObj, isFunction } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import makeArray from '@pesposa/core/src/utils/makeArray';

const getPathSelector = path => {
  if (isFunction(path)) {
    return createSelector(path, makeArray);
  }

  return R.always(makeArray(path));
};

const createPathSelector = (...paths) =>
  createSelector(
    R.map(getPathSelector, paths),
    R.unapply(R.reduce(R.concat, [])),
  );

const createPathStringSelector = (...paths) =>
  createSelector(createPathSelector(...paths), R.join('/'));

// createByChildQuery :: String, Selector, Selector -> Selector
const createByChildQuery = (key, valueSelector, ...paths) =>
  createSelector(
    valueSelector,
    createPathStringSelector(...paths),
    (value, modelPathString) => ({
      path: modelPathString,
      queryParams: [`orderByChild=${key}`, `equalTo=${value}`],
    }),
  );

// modelConnectionsFactory :: String -> Function
const modelConnectionsFactory = dataPath => {
  const createDataSelector = (...paths) => {
    const pathSelector = createPathSelector(...paths);
    return (state, props) => {
      const path = pathSelector(state, props);
      return R.path([...dataPath, ...path], state);
    };
  };

  // createModelSelector :: Selector -> Selector
  const createCollectionSelector = (...paths) =>
    createSelector(
      createDataSelector(...paths),
      R.when(
        isPlainObj,
        R.compose(R.map(([id, record]) => R.merge({ id }, record)), R.toPairs),
      ),
    );

  // createRecordSelector :: Selector, Selector -> Selector
  const createRecordSelector = (idSelector, ...paths) =>
    createSelector(
      createDataSelector(...paths, idSelector),
      idSelector,
      (record, id) => (isPlainObj(record) ? R.merge(record, { id }) : record),
    );

  // createByChildSelector :: String, Selector, Selector -> Selector
  const createByChildSelector = (key, valueSelector, ...paths) =>
    createSelector(
      valueSelector,
      R.compose(R.defaultTo([]), createCollectionSelector(...paths)),
      R.useWith(R.filter, [R.propEq(key), R.identity]),
    );

  // createModelConnections :: ModelPathSelector -> Object
  //   ModelPathSelector =
  //     (State, Props) -> String | [String] OR
  //     String | [String]
  const createModelConnections = (modelPath, options) => {
    const singleton = R.propOr(false, 'singleton', options);
    const modelPathStringSelector = createPathStringSelector(modelPath);

    if (singleton) {
      return {
        query: modelPathStringSelector,
        selector: createDataSelector(modelPath),
        child: childPath => ({
          query: createPathStringSelector(modelPath, childPath),
          selector: createDataSelector(modelPath, childPath),
        }),
      };
    }

    return {
      allObjects: {
        query: modelPathStringSelector,
        selector: createDataSelector(modelPath),
      },
      all: {
        query: modelPathStringSelector,
        selector: createCollectionSelector(modelPath),
      },
      oneObject: idSelector => ({
        query: createPathStringSelector(modelPath, idSelector),
        selector: createDataSelector(modelPath, idSelector),
      }),
      one: idSelector => ({
        query: createPathStringSelector(modelPath, idSelector),
        selector: createRecordSelector(idSelector, modelPath),
        child: childPath => ({
          query: createPathStringSelector(modelPath, idSelector, childPath),
          selector: createDataSelector(modelPath, idSelector, childPath),
        }),
      }),
      byChild: (key, valueSelector) => ({
        query: createByChildQuery(key, valueSelector, modelPath),
        selector: createByChildSelector(key, valueSelector, modelPath),
      }),
    };
  };

  return createModelConnections;
};

export default modelConnectionsFactory;
