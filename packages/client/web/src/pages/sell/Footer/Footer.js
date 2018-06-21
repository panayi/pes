import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styleSheet = theme => ({
  root: {
    margin: 'auto',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    borderTop: [1, 'solid', theme.palette.divider],
  },
});

function HomeFooter(props) {
  const { classes } = props;

  return (
    <footer className={classes.root}>
      <Typography color="inherit">© Pesposa</Typography>
    </footer>
  );
}

HomeFooter.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styleSheet)(HomeFooter);
