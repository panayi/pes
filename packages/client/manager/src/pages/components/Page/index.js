import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const TOOLBAR_HEIGHT = 48;

const styles = theme => ({
  pageWrapper: {
    position: 'relative',
    marginTop: TOOLBAR_HEIGHT,
    width: '100%',
  },
  content: theme.mixins.gutters({
    paddingTop: 80,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  }),
  fluid: {
    maxWidth: 'none !important',
    padding: 0,
  },
  [theme.breakpoints.up(900 + theme.spacing.unit * 6)]: {
    content: {
      maxWidth: 900,
    },
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
});

const Page = ({ className, classes, children, fluid }) => (
  <div className={classes.pageWrapper}>
    <div
      className={classNames(classes.content, className, {
        [classes.fluid]: fluid,
      })}
    >
      {children}
    </div>
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  fluid: PropTypes.bool,
};

Page.defaultProps = {
  className: '',
  fluid: false,
};

export default withStyles(styles)(Page);
