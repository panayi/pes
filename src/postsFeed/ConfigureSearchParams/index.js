/* @flow */
import React from 'react';
import R from 'ramda';
import { withProps } from 'recompose';
import { connectSearchBox } from 'react-instantsearch/connectors';
import { Configure } from 'react-instantsearch/dom';
import { searchParamsSelector } from '../feed';

type Props = {
  searchParams: Object,
};

export const ConfigureSearchParams = (props: Props) => (
  <Configure {...props.searchParams} />
);

export default R.compose(
  connectSearchBox,
  withProps(props => ({
    searchParams: searchParamsSelector(props),
  })),
)(ConfigureSearchParams);
