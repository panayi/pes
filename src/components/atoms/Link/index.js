import * as R from 'ramda';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import { NavLink } from 'react-router-dom';
import { defaultProps, withProps } from 'recompose';
import omitProps from 'utils/omitProps';

const DEFAULT_ACTIVE_CLASS_NAME = 'link--active';

const styles = {
  root: {
    textTransform: 'none',

    [`&.${DEFAULT_ACTIVE_CLASS_NAME}`]: {
      // Styles for active link go here
    },
  },
};

const makeLink = R.compose(
  defaultProps({
    activeClassName: DEFAULT_ACTIVE_CLASS_NAME,
  }),
  withStyles(styles),
  withProps(({ to, classes, className }) => ({
    component: to ? NavLink : null,
    className: classNames(classes.root, className),
  })),
  omitProps(['classes', 'dispatch']),
);

const Link = makeLink(Button);

Link.icon = makeLink(IconButton);

export default Link;
