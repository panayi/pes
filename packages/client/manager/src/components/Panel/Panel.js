import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { renameProp, compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';

const HEADER_HEIGHT = 64;

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: HEADER_HEIGHT,
    padding: [0, theme.spacing.unit * 2],
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  content: {
    position: 'relative',
    flex: 1,
    height: `calc(100% - ${HEADER_HEIGHT}px)`,
  },
});

// Renders a fixed header with scrollable content
const Panel = ({ header, children, classesFromProps, classes }) => (
  <div className={classNames(classes.root, classesFromProps.root)}>
    {header && (
      <Toolbar
        classes={{ root: classNames(classes.header, classesFromProps.header) }}
      >
        {header}
      </Toolbar>
    )}
    <div className={classNames(classes.content, classesFromProps.content)}>
      {children}
    </div>
  </div>
);

Panel.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
  classesFromProps: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
};

Panel.defaultProps = {
  header: null,
  children: null,
  classesFromProps: {},
};

export default compose(
  renameProp('classes', 'classesFromProps'),
  withStyles(styles),
)(Panel);
