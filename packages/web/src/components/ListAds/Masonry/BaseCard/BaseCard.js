import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import withStyles from 'material-ui/styles/withStyles';

const styles = theme => ({
  ad: {
    textDecoration: 'none',
  },
  adPaperRoot: {
    width: '100%',
    borderRadius: theme.borderRadius.md,
  },
});

const BaseCard = ({ children, classes, ...rest }) => (
  <Card
    className={classes.ad}
    classes={{
      root: classes.adPaperRoot,
    }}
    elevation={1}
    {...rest}
  >
    {children}
  </Card>
);

BaseCard.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({}).isRequired,
};

BaseCard.defaultProps = {
  children: null,
};

export default withStyles(styles)(BaseCard);
