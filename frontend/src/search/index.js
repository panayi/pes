/* @flow */
import React from 'react';
import R from 'ramda';
import { Input } from 'rebass';
import { connectSearchBox } from 'react-instantsearch/connectors';

type Props = {
  value: String,
  refine: Function,
}

export const Search = (props: Props) => (
  <Input
    value={props.value}
    onChange={e => props.refine(e.target.value)}
  />
);

export default R.compose(
  connectSearchBox,
)(Search);
