import * as R from 'ramda';
import { mapProps } from 'recompose';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    borderBottom: [1, 'solid', theme.palette.divider],
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
