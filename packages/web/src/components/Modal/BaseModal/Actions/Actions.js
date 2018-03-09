import * as R from 'ramda';
import { withProps } from 'recompose';
import { DialogActions } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    margin: 2 * theme.spacing.unit,
  },
});

export default R.compose(
  withStyles(styles),
  withProps(({ classes }) => ({
    className: classes.root,
  })),
)(DialogActions);
