import * as R from 'ramda';
import { createSelector } from 'reselect';
import TYPES from './types';

// ------------------------------------
// Constants
// ------------------------------------
export const FIREBASE_PATH = ['firebase'];
export const DATA_PATH = [...FIREBASE_PATH, 'data'];

// ------------------------------------
// Helpers
// ------------------------------------

// createModelSelector :: modelType -> Object
//   modelType = String
const createModelSelector = R.compose(R.pathOr([]), R.append(R.__, DATA_PATH));

// createRecordQuery :: modelType, Selector -> Selector
//   Selector = (state, props) => Any
const createRecordQuery = (modelType, idSelector) =>
  createSelector(idSelector, id => `${modelType}/${id}`);

// createRecordSelector :: modelType, Selector -> Selector
const createRecordSelector = (modelType, idSelector) =>
  createSelector(
    idSelector,
    R.compose(R.defaultTo([]), createModelSelector(modelType)),
    R.prop,
  );

// connectDataForType :: Type -> Object
const connectDataForType = type => {
  const modelType = TYPES[type];

  return {
    all: {
      query: modelType,
      selector: createModelSelector(modelType),
    },
    one: idSelector => ({
      query: createRecordQuery(modelType, idSelector),
      selector: createRecordSelector(modelType, idSelector),
    }),
  };
};

const modelConnections = R.map(connectDataForType, TYPES);

export default modelConnections;
