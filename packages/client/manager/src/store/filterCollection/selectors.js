import * as R from 'ramda';
import { isNilOrEmpty, ensureArray } from 'ramda-adjunct';
import createCachedSelector from 're-reselect';
import match from 'autosuggest-highlight/match';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propOrSelector from '@pesposa/core/src/utils/propOrSelector';

const rootPath = ['filterCollection'];
const selectedPath = [...rootPath, 'selected'];
const queryPath = [...rootPath, 'query'];

export const selectedSelector = (state, props) =>
  R.path([...selectedPath, props.id], state);

// queryValueSelector :: (State, Props) -> String
export const queryValueSelector = (state, props) =>
  R.pathOr('', [...queryPath, props.id], state);

const collectionSelector = createCachedSelector(
  propSelector('collection'),
  R.compose(R.filter(R.identity), R.defaultTo([])),
)(propSelector('id'));

// hitsSelector :: (State, Props) => Hits
//   Props: { searchableAttributes: [String], collection: [Object] }
//   Hits: [Object]
export const hitsSelector = createCachedSelector(
  queryValueSelector,
  propOrSelector([], 'searchableAttributes'),
  collectionSelector,
  (query, searchableAttributes, collection) => {
    if (isNilOrEmpty(searchableAttributes) || isNilOrEmpty(collection)) {
      return [];
    }

    if (R.isEmpty(query)) {
      return collection;
    }

    return collection
      .map(item => {
        let matches = {};

        searchableAttributes.forEach(path => {
          const finalPath = ensureArray(path);
          const value = R.path(finalPath, item);
          const result = match(value, query);

          if (!R.isEmpty(result)) {
            matches = R.assocPath(finalPath, result, matches);
          }
        });

        return {
          ...item,
          matches,
        };
      })
      .filter(item => !R.isEmpty(item.matches));
  },
)(queryValueSelector);
