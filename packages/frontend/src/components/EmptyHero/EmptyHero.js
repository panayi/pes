import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
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
    color: theme.palette.grey[400],
  },
  icon: {
    width: 200,
    height: 200,
  },
});

const EmptyHero = ({ icon: Icon, title, tagline, children, classes }) => (
  <div className={classes.root}>
    <Icon className={classes.icon} />
    {title && (
      <Typography variant="display3" component="h2" paragraph>
        Oh snap!
      </Typography>
    )}
    <Typography variant="headline" color="textSecondary">
      {tagline}
    </Typography>
    {children}
  </div>
);

EmptyHero.propTypes = {
  icon: elementType.isRequired,
  title: PropTypes.string,
  tagline: PropTypes.string.isRequired,
  children: PropTypes.node,
};

EmptyHero.defaultProps = {
  title: null,
  children: null,
};

export default withStyles(styles)(EmptyHero);
