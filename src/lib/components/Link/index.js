import * as R from 'ramda';
import { Button, withStyles } from 'material-ui';
import { NavLink } from 'react-router-dom';
import { defaultProps, withProps } from 'recompose';
import generateClassName from '../../helpers/generateClassName';

const DEFAULT_ACTIVE_CLASS_NAME = generateClassName();

const styles = {
  [DEFAULT_ACTIVE_CLASS_NAME]: {
    color: 'red',
  },
};

export default R.compose(
  withStyles(styles),
  defaultProps({
    activeClassName: DEFAULT_ACTIVE_CLASS_NAME,
  }),
  withProps(({ to }) => ({
    component: to ? NavLink : null,
  })),
)(Button);
