import React from 'react';
import * as R from 'ramda';
import { withStateHandlers } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import Star from './Star/Star';

const STARS_COUNT = 5;

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: -theme.spacing.unit * 1.5,
  },
  star: {
    paddingRight: theme.spacing.unit * 1.5,
    cursor: 'pointer',
    outline: 'none',
  },
});

const Stars = ({
  value,
  onClick,
  handleMouseEnter,
  handleMouseLeave,
  hoveredIndex,
  classes,
}) => (
  <div className={classes.root}>
    {R.map(
      index => (
        <div
          key={index}
          className={classes.star}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onClick(index)}
          role="button"
          tabIndex="-1"
        >
          <Star active={value >= index} hovered={hoveredIndex >= index} />
        </div>
      ),
      R.range(1, STARS_COUNT + 1),
    )}
  </div>
);

export default R.compose(
  withStateHandlers(
    {
      hoveredIndex: null,
    },
    {
      handleMouseEnter: () => index => ({
        hoveredIndex: index,
      }),
      handleMouseLeave: () => () => ({
        hoveredIndex: null,
      }),
    },
  ),
  withStyles(styles),
)(Stars);
