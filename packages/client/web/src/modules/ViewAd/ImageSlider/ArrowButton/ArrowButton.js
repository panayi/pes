import React from 'react';
import * as R from 'ramda';
import { mapProps } from 'recompose';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import renderNothingWhen from '@pesposa/client-core/src/hocs/renderNothingWhen';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    margin: 'auto',
    transform: 'none',
    color: fade(theme.palette.common.white, 0.9),
    backgroundColor: fade(theme.palette.primary.main, 0.67),
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

const isDisabled = R.curry((direction, props) => {
  const { currentSlide, slideCount } = props;

  return direction === 'prev'
    ? currentSlide === 0
    : currentSlide === slideCount - 1;
});

const createArrowButton = (Icon, direction) =>
  R.compose(
    renderNothingWhen(
      R.either(R.propEq('slideCount', 1), isDisabled(direction)),
    ),
    withStyles(styles),
    mapProps(props => {
      const { onClick, classes } = props;
      return {
        onClick,
        disableRipple: true,
        children: <Icon />,
        classes: {
          root: classNames(classes.root, classes[direction]),
        },
      };
    }),
  )(IconButton);

const ArrowButton = {
  prev: createArrowButton(KeyboardArrowLeft, 'prev'),
  next: createArrowButton(KeyboardArrowRight, 'next'),
};

export default ArrowButton;
