import React from 'react';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import theme from '../../config/theme';

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

const Spinner = ({ centered, className, overlay, classes }) => {
  if (centered) {
    return (
      <div
        className={classNames(classes.centered, className, {
          [classes.overlay]: overlay,
        })}
      >
        <CircularProgress />
      </div>
    );
  }

  return <CircularProgress />;
};

export default withStyles(styles)(Spinner);
