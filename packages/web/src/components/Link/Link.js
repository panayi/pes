import * as R from 'ramda';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import { NavLink } from 'react-router-dom';
import { defaultProps, withProps } from 'recompose';
import omitProps from 'utils/omitProps';
import Button from 'components/Button/Button';

const DEFAULT_ACTIVE_CLASS_NAME = 'link--active';

const styles = {
  root: {
    textTransform: 'none',
    cursor: 'default',

    [`&.${DEFAULT_ACTIVE_CLASS_NAME}`]: {
      // Styles for active link go here
    },
  },
  clickable: {
    cursor: 'pointer',
  },
};

const makeLink = R.compose(
  defaultProps({
    activeClassName: DEFAULT_ACTIVE_CLASS_NAME,
  }),
  withStyles(styles),
  withProps(({ to, classes, className }) => ({
    component: to ? NavLink : null,
    className: classNames(classes.root, className, {
      [classes.clickable]: !!to,
    }),
  })),
  omitProps(['classes', 'dispatch']),
);

const Link = makeLink(Button);

Link.icon = makeLink(IconButton);

export default Link;
