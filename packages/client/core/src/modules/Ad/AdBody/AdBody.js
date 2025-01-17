/* eslint-disable react/no-array-index-key */
import React from 'react';
import { createSelector } from 'reselect';
import { withProps } from 'recompose';
import propOrSelector from '@pesposa/core/src/utils/propOrSelector';
import AdProp from '../AdProp/AdProp';

const bodySelector = createSelector(propOrSelector('', 'body'), body =>
  body.split('\n').map((line, index, arr) => {
    const lineItem = <span key={index}>{line}</span>;

    if (index === arr.length - 1) {
      return lineItem;
    }

    return [lineItem, <br key={`${index}br`} />];
  }),
);

export default withProps({
  getProp: bodySelector,
})(AdProp);
