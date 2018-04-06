import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Link from '@pesposa/client-core/src/components/Link/Link';

const styles = theme => ({
  addButton: {
    minWidth: 53,
    height: 63,
    borderRight: [1, 'solid', theme.palette.divider],
    borderRadius: 0,
  },
  activeAddButton: {
    background: theme.palette.action.hover,
  },
});

const CreateButton = ({ to, classes }) => (
  <Link
    className={classes.addButton}
    activeClassName={classes.activeAddButton}
    size="small"
    to={to}
  >
    <AddIcon />
  </Link>
);

export default withStyles(styles)(CreateButton);
