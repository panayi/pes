import React from 'react';
import * as R from 'ramda';
import { mapProps, setDisplayName } from 'recompose';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';
import { fade } from 'material-ui/styles/colorManipulator';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import renderNothingWhen from 'hocs/renderNothingWhen';
import Button from 'components/Button/Button';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    margin: 'auto',
    transform: 'none',
    backgroundColor: fade(theme.palette.primary.main, 0.57),
    transition: theme.transitions.create('backgroundColor'),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.8),
    },
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
    renderNothingWhen(R.propEq('slideCount', 1)),
    withStyles(styles),
    setDisplayName('ArrowButton'),
    mapProps(props => ({
      onClick: props.onClick,
      variant: 'fab',
      color: 'primary',
      disableRipple: true,
      children: <Icon />,
      classes: {
        root: classNames(props.classes.root, props.classes[extraClass]),
      },
    })),
  )(Button);

const ArrowButton = {
  prev: createArrowButton(KeyboardArrowLeft, 'prev'),
  next: createArrowButton(KeyboardArrowRight, 'next'),
};

export default ArrowButton;
