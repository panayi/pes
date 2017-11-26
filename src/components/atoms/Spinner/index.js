import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import MaterialSpinner from 'react-spinner-material';
import { withProps, branch, renderComponent } from 'recompose';
import { withStyles, Grid } from 'material-ui';
import theme from 'config/theme';

const BaseSpinner = withProps({
  spinnerColor: theme.palette.primary['500'],
  visible: true,
})(MaterialSpinner);

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

const CenteredSpinner = withStyles(styles)(({ classes, overlay, ...otherProps }) => (
  <Grid
    className={classNames(classes.spinnerWrap, { [classes.overlay]: overlay })}
    container
    justify="center"
    alignItems="center"
  >
    <BaseSpinner {...otherProps} />
  </Grid>
));

export default branch(
  R.prop('centered'),
  renderComponent(CenteredSpinner),
)(BaseSpinner);
