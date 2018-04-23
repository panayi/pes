import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import MDSpinner from 'react-md-spinner';
import { defaultProps, branch, renderComponent } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import theme from 'config/theme';

const BaseSpinner = defaultProps({
  singleColor: theme.palette.primary.main,
  size: 42,
})(MDSpinner);

const styles = {
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  ({ className, overlay, classes, ...otherProps }) => (
    <div
      className={classNames(classes.centered, className, {
        [classes.overlay]: overlay,
      })}
    >
      <BaseSpinner {...otherProps} />
    </div>
  ),
);

export default branch(R.prop('centered'), renderComponent(CenteredSpinner))(
  BaseSpinner,
);
