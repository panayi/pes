import React, { Component } from 'react';
import { noop } from 'ramda-adjunct';
import { withStyles } from 'material-ui/styles';
import { fade } from 'material-ui/styles/colorManipulator';
import SearchIcon from 'material-ui-icons/Search';
import { propsChanged } from 'pesposa-utils';

// Based on:
// https://github.com/callemall/material-ui/blob/v1-beta/docs/src/modules/components/AppSearch.js

const styles = theme => ({
  root: {
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
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${
      theme.spacing.unit
    }px ${theme.spacing.unit * 7}px`,
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

class Form extends Component<Props> {
  componentWillReceiveProps(nextProps) {
    if (propsChanged(['values'], this.props, nextProps)) {
      this.props.handleSubmit({ preventDefault: noop });
    }
  }

  render() {
    const {
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      classes,
    } = this.props;

    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <input
          className={classes.input}
          name="query"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.query}
          placeholder="What are you looking for?"
        />
      </form>
    );
  }
}

export default withStyles(styles)(Form);
