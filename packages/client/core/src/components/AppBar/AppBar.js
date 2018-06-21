import * as R from 'ramda';
import { mapProps } from 'recompose';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
  },
});

export default R.compose(
  withStyles(styles),
  mapProps(({ className, classes, ...rest }) => ({
    className: classNames(classes.appBar, className),
    ...rest,
  })),
)(AppBar);
