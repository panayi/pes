import * as R from 'ramda';
import { isPlainObj } from 'ramda-adjunct';
import { createSelector } from 'reselect';

// modelConnectionsFactory :: String -> Function
const modelConnectionsFactory = dataPath => {
  const createModelPathSelector = modelPathSelector =>
    createSelector(
      R.is(Function, modelPathSelector)
        ? modelPathSelector
        : R.always(modelPathSelector),
      R.unless(R.is(Array), R.of),
    );

  const createModelPathStringSelector = modelPathSelector =>
    createSelector(modelPathSelector, R.join('/'));

  const createModelObjectsSelector = modelPathSelector =>
    createSelector((state, props) => {
      const modelPath = modelPathSelector(state, props);
      return R.pathOr([], [...dataPath, ...modelPath], state);
    }, R.defaultTo([]));

  // createModelSelector :: Selector -> Selector
  const createModelSelector = modelObjectSelector =>
    createSelector(
      modelObjectSelector,
      R.when(
        isPlainObj,
        R.compose(R.map(([id, record]) => R.merge({ id }, record)), R.toPairs),
      ),
    );

  // createRecordQuery :: Selector, Selector -> Selector
  const createRecordQuery = (idSelector, modelPathStringSelector) =>
    createSelector(
      modelPathStringSelector,
      idSelector,
      (modelPathString, id) => `${modelPathString}/${id}`,
    );

  // createRecordSelector :: Selector, Selector -> Selector
  const createRecordSelector = (idSelector, modelSelector) =>
    createSelector(
      idSelector,
      modelSelector,
      R.useWith(R.find, [R.propEq('id'), R.identity]),
    );

  // createByChildQuery :: String, Selector, Selector -> Selector
  const createByChildQuery = (key, valueSelector, modelPathStringSelector) =>
    createSelector(
      valueSelector,
      modelPathStringSelector,
      (value, modelPathString) => ({
        path: modelPathString,
        queryParams: [`orderByChild=${key}`, `equalTo=${value}`],
      }),
    );

  // createByChildSelector :: String, Selector, Selector -> Selector
  const createByChildSelector = (key, valueSelector, modelSelector) =>
    createSelector(
      valueSelector,
      modelSelector,
      R.useWith(R.filter, [R.propEq(key), R.identity]),
    );

  // createModelConnections :: ModelPathSelector -> Object
  //   ModelPathSelector =
  //     (State, Props) -> String | [String] OR
  //     String | [String]
  const createModelConnections = modelPathSelector => {
    const finalModelPathSelector = createModelPathSelector(modelPathSelector);
    const modelPathStringSelector = createModelPathStringSelector(
      finalModelPathSelector,
    );
    const modelObjectsSelector = createModelObjectsSelector(
      finalModelPathSelector,
    );
    const modelSelector = createModelSelector(modelObjectsSelector);

    return {
      allObjects: {
        query: modelPathStringSelector,
        selector: modelObjectsSelector,
      },
      all: {
        query: modelPathStringSelector,
        selector: modelSelector,
      },
      one: idSelector => ({
        query: createRecordQuery(idSelector, modelPathStringSelector),
        selector: createRecordSelector(idSelector, modelSelector),
      }),
      byChild: (key, valueSelector) => ({
        query: createByChildQuery(key, valueSelector, modelPathStringSelector),
        selector: createByChildSelector(key, valueSelector, modelSelector),
      }),
    };
  };

  return createModelConnections;
};

export default modelConnectionsFactory;
