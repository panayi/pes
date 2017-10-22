/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Input } from 'material-ui';
import { connectSearchBox } from 'react-instantsearch/connectors';

type Props = {
  value: String,
  refine: Function,
}

export const SearchInput = (props: Props) => (
  <Input
    value={props.value}
    onChange={e => props.refine(e.target.value)}
  />
);

export default R.compose(
  connectSearchBox,
)(SearchInput);
