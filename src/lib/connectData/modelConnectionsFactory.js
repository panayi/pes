import * as R from 'ramda';
import { createSelector } from 'reselect';

// modelConnectionsFactory :: String -> Function
const modelConnectionsFactory = dataPath => {
  // createModelSelector :: modelType -> Object
  //   modelType = String
  const createModelSelector = R.compose(R.pathOr([]), R.append(R.__, dataPath));

  // createRecordQuery :: modelType, Selector -> Selector
  //   Selector = (state, props) => Any
  const createRecordQuery = (modelType, idSelector) =>
    createSelector(idSelector, id => `${modelType}/${id}`);

  // createRecordSelector :: modelType, Selector -> Selector
  const createRecordSelector = (modelType, idSelector) =>
    createSelector(
      idSelector,
      R.compose(R.defaultTo([]), createModelSelector(modelType)),
      R.converge(R.merge, [R.assoc('id', R.__, {}), R.prop]),
    );

  const createByChildQuery = (modelType, key, valueSelector) =>
    createSelector(valueSelector, value => ({
      path: modelType,
      queryParams: [`orderByChild=${key}`, `equalTo=${value}`],
    }));

  const createByChildSelector = (modelType, key, valueSelector) =>
    createSelector(
      valueSelector,
      R.compose(R.defaultTo([]), createModelSelector(modelType)),
      R.useWith(R.filter, [R.propEq(key), R.identity]),
    );

  // createModelConnections :: (modelType, String | Nil) -> Object
  const createModelConnections = (modelType, rootPath) => ({
    all: {
      query: rootPath || modelType,
      selector: createModelSelector(modelType),
    },
    one: idSelector => ({
      query: createRecordQuery(modelType, idSelector),
      selector: createRecordSelector(modelType, idSelector),
    }),
    byChild: (key, valueSelector) => ({
      query: createByChildQuery(modelType, key, valueSelector),
      selector: createByChildSelector(modelType, key, valueSelector),
    }),
  });

  return createModelConnections;
};

export default modelConnectionsFactory;
