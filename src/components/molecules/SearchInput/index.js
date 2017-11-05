/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withStyles } from 'material-ui';
import { fade } from 'material-ui/styles/colorManipulator';
import SearchIcon from 'material-ui-icons/Search';
import { connectSearchBox } from 'react-instantsearch/connectors';

type Props = {
  value: String,
  refine: Function,
}

// Based on:
// https://github.com/callemall/material-ui/blob/v1-beta/docs/src/modules/components/AppSearch.js

const styles = theme => ({
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 200,
      '&:focus': {
        width: 250,
      },
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 7,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 7}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
    '&::placeholder': {
      color: fade(theme.palette.common.white, 0.25),
    },
  },
});

export const SearchInput = ({ value, refine, classes }: Props) => (
  <div className={classes.wrapper}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <input
      className={classes.input}
      value={value}
      onChange={e => refine(e.target.value)}
      placeholder="What are you looking for?"
    />
  </div>
);

export default R.compose(
  connectSearchBox,
  withStyles(styles),
)(SearchInput);
