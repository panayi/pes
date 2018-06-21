import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import pure from 'recompose/pure';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  wrapper: {
    flex: 1,
    padding: [0, theme.spacing.unit],
    position: 'relative',
    fontFamily: theme.typography.fontFamily,
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
  },
  search: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${
      theme.spacing.unit
    }px ${theme.spacing.unit * 5}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    '&:focus': {
      outline: 0,
    },
    '&::placeholder': {
      color: 'inherit',
      opacity: 0.5,
    },
  },
});

const SearchInput = ({ value, onChange, placeholder, classes }) => (
  <div className={classes.wrapper}>
    <div className={classes.search}>
      <SearchIcon />
    </div>
    <input
      className={classes.input}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

SearchInput.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  value: '',
  placeholder: '',
};

export default R.compose(
  withStyles(styles, {
    name: 'SearchInput',
  }),
  pure,
)(SearchInput);
