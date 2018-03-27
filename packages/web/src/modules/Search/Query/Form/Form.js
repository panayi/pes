import React, { Component } from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { withRouter } from 'react-router-dom';
import withStyles from 'material-ui/styles/withStyles';
import SearchIcon from 'material-ui-icons/Search';
import CloseIcon from 'material-ui-icons/Close';
import propsChanged from '@pesposa/core/src/utils/propsChanged';

// Based on:
// https://github.com/callemall/material-ui/blob/v1-beta/docs/src/modules/components/AppSearch.js

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    borderRadius: theme.borderRadius.md,
    border: [1, 'solid', theme.palette.divider],
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
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
    color: 'inherit',
    padding: `9px ${theme.spacing.unit}px 9px ${theme.spacing.unit * 7}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    width: '100%',
    boxSizing: 'border-box',
    '&:focus': {
      outline: 0,
    },
  },
  clearButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: 6,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
});

class Form extends Component<Props> {
  componentWillReceiveProps(nextProps) {
    if (propsChanged(['values'], this.props, nextProps)) {
      this.props.handleSubmit({ preventDefault: noop });
    }
  }

  handleFormSubmit = (...args) => {
    const { inHome, history, handleSubmit } = this.props;

    if (!inHome) {
      history.push('/');
    }

    handleSubmit(...args);
  };

  render() {
    const {
      values,
      handleChange,
      handleBlur,
      handleClear,
      hasValue,
      classes,
    } = this.props;

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
        {hasValue && (
          <a
            role="button"
            tabIndex="0"
            className={classes.clearButton}
            onClick={handleClear}
          >
            <CloseIcon />
          </a>
        )}
      </form>
    );
  }
}

export default R.compose(withRouter, withStyles(styles))(Form);
