import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  tooltip: {
    padding: '4px 8px !important',
    opacity: '0.95 !important',
    borderRadius: `2 !important`,
    background: `${theme.palette.grey[700]} !important`,
    '&:before,&:after': {
      display: 'none',
    },
  },
  tooltipText: {
    color: theme.palette.common.white,
    fontSize: theme.typography.caption.fontSize,
  },
});

const Tooltip = ({ id, children, classes }) => (
  <ReactTooltip className={classes.tooltip} id={id}>
    <Typography className={classes.tooltipText}>{children}</Typography>
  </ReactTooltip>
);

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  classes: PropTypes.shape({}).isRequired,
};

Tooltip.defaultProps = {
  children: null,
};

export default withStyles(styles)(Tooltip);
