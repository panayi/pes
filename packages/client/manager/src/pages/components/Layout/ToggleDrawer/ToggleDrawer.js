import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { actions as drawerActions } from 'store/drawer';

const ToggleDrawer = ({ toggleDrawer }) => (
  <IconButton color="inherit" onClick={() => toggleDrawer()}>
    <MenuIcon />
  </IconButton>
);

ToggleDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  toggleDrawer: drawerActions.toggle,
};

export default connect(null, mapDispatchToProps)(ToggleDrawer);
