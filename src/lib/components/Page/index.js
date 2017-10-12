import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Grid } from 'material-ui';

const FIXED_LAYOUT_WIDTH = 1128;

const numberOfChildrenEquals = number => R.compose(
  R.equals(number),
  R.length,
  R.defaultTo([]),
  R.prop('children'),
);


const OneColumn = ({ children, fixedWidth, ...otherProps }) => (
  <Grid
    container
    {...otherProps}
  >
    <Grid
      item
      style={{ width: fixedWidth ? FIXED_LAYOUT_WIDTH : null }}
    >
      {children}
    </Grid>
  </Grid>
);

const TwoColumn = ({ children, widths = ['300px', null], ...otherProps }) => (
  <Grid
    container
    {...otherProps}
  >
    <Grid
      item
      style={{ flex: `0 0 ${widths[0]}` }}
    >
      {children[0]}
    </Grid>
    <Grid
      item
      style={{ flex: 1, width: widths[1] }}
    >
      {children[1]}
    </Grid>
  </Grid>
);

const ThreeColumn = ({ children, widths = ['300px', null, '300px'], ...otherProps }) => (
  <Grid
    container
    {...otherProps}
  >
    <Grid item style={{ flex: `0 0 ${widths[0]}` }}>
      {children[0]}
    </Grid>
    <Grid
      item
      style={{ flex: 1, width: widths[1] }}
    >
      {children[1]}
    </Grid>
    <Grid
      item
      style={{ flex: `0 0 ${widths[2]}` }}
    >
      {children[2]}
    </Grid>
  </Grid>
);

const Page = R.cond([
  [numberOfChildrenEquals(2), TwoColumn],
  [numberOfChildrenEquals(3), ThreeColumn],
  [R.T, OneColumn],
]);

Page.propTypes = {
  children: PropTypes.node,
  widths: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

Page.defaultProps = {
  children: null,
};

export default Page;
