import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    color: theme.palette.text.default,
  },
  icon: {
    color: 'inherit',
    width: 200,
    height: 200,
  },
  smallIcon: {
    width: 100,
    height: 100,
  },
});

const EmptyHero = ({
  icon: Icon,
  title,
  tagline,
  small,
  className,
  children,
  classes,
}) => (
  <div className={classNames(classes.root, className)}>
    {Icon && (
      <Icon
        className={classNames(classes.icon, { [classes.smallIcon]: small })}
      />
    )}
    {title && (
      <Typography
        variant={small ? 'display1' : 'display3'}
        color="inherit"
        component="h2"
        paragraph
      >
        {title}
      </Typography>
    )}
    <Typography variant="headline" color="inherit">
      {tagline}
    </Typography>
    {children}
  </div>
);

EmptyHero.propTypes = {
  icon: elementType,
  title: PropTypes.string,
  tagline: PropTypes.string.isRequired,
  small: PropTypes.bool,
  children: PropTypes.node,
};

EmptyHero.defaultProps = {
  icon: null,
  title: null,
  small: false,
  children: null,
};

export default withStyles(styles)(EmptyHero);
