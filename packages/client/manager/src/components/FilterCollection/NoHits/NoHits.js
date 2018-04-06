import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  noResult: {
    padding: theme.spacing.unit,
    color: theme.palette.text.disabled,
  },
});

const NoHits = ({ classes }) => (
  <Typography className={classes.noResult}>No Results Found</Typography>
);

NoHits.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(NoHits);
