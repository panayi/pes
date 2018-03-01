import * as R from 'ramda';
import { withProps } from 'recompose';
import { DialogActions } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    marginRight: 2 * theme.spacing.unit,
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing.unit / 2,
    },
  },
});

export default R.compose(
  withStyles(styles),
  withProps(({ classes }) => ({
    className: classes.root,
  })),
)(DialogActions);
