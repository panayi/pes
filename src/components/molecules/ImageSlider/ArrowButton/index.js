import React from 'react';
import * as R from 'ramda';
import { mapProps, setDisplayName } from 'recompose';
import classNames from 'classnames';
import { Button, withStyles } from 'material-ui';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    margin: 'auto',
    transform: 'none',
  },
  prev: {
    left: theme.spacing.unit * 2,
  },
  next: {
    right: theme.spacing.unit * 2,
  },
});

const createArrowButton = (Icon, extraClass) =>
  R.compose(
    withStyles(styles),
    setDisplayName('ArrowButton'),
    mapProps(props => ({
      onClick: props.onClick,
      fab: true,
      color: 'primary',
      disableRipple: true,
      children: <Icon />,
      className: classNames(props.classes.root, props.classes[extraClass]),
    })),
  )(Button);

const ArrowButton = {
  prev: createArrowButton(KeyboardArrowLeft, 'prev'),
  next: createArrowButton(KeyboardArrowRight, 'next'),
};

export default ArrowButton;
