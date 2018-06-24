import * as R from 'ramda';
import { isUndefined } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';

export const routeParamsSelector = propSelector(['match', 'params']);

export const routeParamSelector = key =>
  R.compose(
    R.propOr(null, key),
    R.defaultTo({}),
    routeParamsSelector,
  );

export const searchPathSelector = createSelector(
  propSelector('place'),
  propSelector('category'),
  routeParamSelector('place'),
  routeParamSelector('category'),
  (place, category, currentPlace, currentCategory) => {
    const finalPlace = isUndefined(place) ? currentPlace : place;
    const finalCategory = isUndefined(category) ? currentCategory : category;

    if (finalPlace && finalCategory) {
      return `/${finalCategory}/${finalPlace}`;
    }

    if (finalPlace) {
      return `/all/${finalPlace}`;
    }

    if (finalCategory) {
      return `/c/${finalCategory}`;
    }

    return '/';
  },
);
