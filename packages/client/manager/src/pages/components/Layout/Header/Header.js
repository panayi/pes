import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CurrentUserMenu from '@pesposa/client-core/src/modules/User/CurrentUserMenu/CurrentUserMenu';

const styles = theme => ({
  actions: {
    marginRight: theme.spacing.unit,
  },
  title: {
    marginLeft: theme.spacing.unit,
    flex: '0 1 auto',
    fontWeight: theme.typography.fontWeightLight,
    fontSize: '1.2rem',
  },
  grow: {
    flex: '1 1 auto',
  },
});

const Header = props => {
  const { actions, title, children, classes, secondaryActions } = props;

  return (
    <React.Fragment>
      <div className={classes.actions}>{actions}</div>
      {title && (
        <Typography
          className={classes.title}
          type="title"
          color="inherit"
          component="h1"
          noWrap
        >
          {title}
        </Typography>
      )}
      <div className={classes.grow}>{children}</div>
      {secondaryActions}
      <CurrentUserMenu />
    </React.Fragment>
  );
};

Header.propTypes = {
  actions: PropTypes.node,
  secondaryActions: PropTypes.node,
  title: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.shape({}).isRequired,
};

Header.defaultProps = {
  actions: null,
  secondaryActions: null,
  title: null,
  children: null,
};

export default withStyles(styles)(Header);
