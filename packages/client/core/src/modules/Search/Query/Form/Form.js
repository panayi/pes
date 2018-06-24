import React, { Component } from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { selectors as responsiveSelectors } from '../../../../store/responsive';

// Based on:
// https://github.com/callemall/material-ui/blob/v1-beta/docs/src/modules/components/AppSearch.js

const INSTANT_SEARCH_TIMEOUT = 400;

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
    color: theme.palette.text.secondary,
    [theme.breakpoints.down(theme.map.phone)]: {
      width: theme.spacing.unit * 5,
    },
  },
  input: {
    padding: `9px ${theme.spacing.unit}px 9px ${theme.spacing.unit * 6.5}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    width: '100%',
    boxSizing: 'border-box',
    font: 'inherit',
    color: theme.palette.text.secondary,
    '&:focus': {
      outline: 0,
    },
    '&::placeholder': {
      color: 'inherit',
    },
    [theme.breakpoints.down(theme.map.phone)]: {
      paddingLeft: theme.spacing.unit * 4.5,
      fontSize: 15,
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

class Form extends Component {
  handleChange = debounce(() => {
    const { handleSubmit } = this.props;
    handleSubmit({ preventDefault: noop });
  }, INSTANT_SEARCH_TIMEOUT);

  componentDidUpdate(prevProps) {
    if (propsChanged(['values'], prevProps, this.props)) {
      this.handleChange();
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
      isPhone,
      classes,
    } = this.props;

    return (
      <form className={classes.root} onSubmit={this.handleFormSubmit}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <input
          className={classNames('data-hj-whitelist', classes.input)}
          name="query"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.query}
          placeholder={isPhone ? 'Search' : 'What are you looking for?'}
        />
        {hasValue && (
          <span
            role="button"
            tabIndex="0"
            className={classes.clearButton}
            onClick={handleClear}
          >
            <CloseIcon />
          </span>
        )}
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isPhone: responsiveSelectors.isPhoneSelector,
});

export default R.compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
)(Form);
