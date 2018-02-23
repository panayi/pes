import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import MDSpinner from 'react-md-spinner';
import { withProps, branch, renderComponent } from 'recompose';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import theme from 'config/theme';

const BaseSpinner = withProps({
  singleColor: theme.palette.primary['500'],
  size: 42,
})(MDSpinner);

const styles = {
  spinnerWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    background: theme.palette.common.white,
  },
};

const CenteredSpinner = withStyles(styles)(
  ({ classes, overlay, ...otherProps }) => (
    <Grid
      className={classNames(classes.spinnerWrap, {
        [classes.overlay]: overlay,
      })}
      container
      justify="center"
      alignItems="center"
    >
      <BaseSpinner {...otherProps} />
    </Grid>
  ),
);

export default branch(R.prop('centered'), renderComponent(CenteredSpinner))(
  BaseSpinner,
);
