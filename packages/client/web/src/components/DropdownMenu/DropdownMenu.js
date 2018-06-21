import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@pesposa/client-core/src/components/Button/Button';
import Link from '@pesposa/client-core/src/components/Link/Link';

class DropdownMenu extends Component {
  static propTypes = {
    anchor: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
          .isRequired,
        onClick: PropTypes.func,
      }),
    ),
  };

  static defaultProps = {
    anchor: null,
    items: [],
  };

  state = {
    anchorEl: null,
    open: false,
  };

  handleAnchorClick = event => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleMenuItemClick = menuItem => {
    const { onClick } = menuItem;
    if (R.is(Function, onClick)) {
      onClick();
    }
    this.handleRequestClose();
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { anchor, items } = this.props;
    const { open, anchorEl } = this.state;

    return (
      <div>
        <Button key="anchor" onClick={this.handleAnchorClick} size="small">
          {anchor}
        </Button>
        <Menu
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={this.handleRequestClose}
        >
          {items.map(item => (
            <MenuItem
              key={item.id}
              onClick={() => this.handleMenuItemClick(item)}
            >
              {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default DropdownMenu;
