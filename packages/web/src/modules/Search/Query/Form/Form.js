import React, { Component } from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { push as _push } from 'react-router-redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { fade } from 'material-ui/styles/colorManipulator';
import SearchIcon from 'material-ui-icons/Search';
import propsChanged from '@pesposa/core/src/utils/propsChanged';

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
    boxSizing: 'border-box',
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

  handleFormSubmit = (...args) => {
    const { inHome, push, handleSubmit } = this.props;

    if (!inHome) {
      push('/');
    }

    handleSubmit(...args);
  };

  render() {
    const { values, handleChange, handleBlur, classes } = this.props;

    return (
      <form className={classes.root} onSubmit={this.handleFormSubmit}>
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

const mapDispatchToProps = {
  push: _push,
};

export default R.compose(connect(null, mapDispatchToProps), withStyles(styles))(
  Form,
);
