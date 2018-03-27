import * as R from 'ramda';
import { withProps } from 'recompose';
import { DialogActions } from 'material-ui/Dialog';
import withStyles from 'material-ui/styles/withStyles';

const styles = theme => ({
  root: {
    margin: [
      theme.spacing.unit,
      2 * theme.spacing.unit,
      2 * theme.spacing.unit,
    ],
  },
});

export default R.compose(
  withStyles(styles),
  withProps(({ classes }) => ({
    className: classes.root,
  })),
)(DialogActions);
