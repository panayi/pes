import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Link from '@pesposa/client-core/src/components/Link/Link';

const styles = theme => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    borderRadius: 0,
  },
  buttonLeaf: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    borderRadius: 0,
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  buttonLabel: {
    justifyContent: 'space-between',
  },
  active: {
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightMedium,
  },
});

class NavItem extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.shape({}).isRequired,
    depth: PropTypes.number.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
    openImmediately: PropTypes.bool,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    children: null,
    to: null,
    onClick: null,
    openImmediately: false,
  };

  state = {
    open: this.props.openImmediately,
  };

  componentDidMount() {
    // So we only run this logic once.
    if (!this.props.openImmediately) {
      return;
    }

    // Center the selected item in the list container.
    const activeElement = document.querySelector(
      `.${this.props.classes.active}`,
    );
    if (activeElement && activeElement.scrollIntoView) {
      activeElement.scrollIntoView({});
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const {
      children,
      classes,
      depth,
      to,
      onClick,
      openImmediately,
      title,
      secondaryText,
      ...other
    } = this.props;

    const style = {
      paddingLeft: 8 * (3 + 2 * depth),
    };

    if (to) {
      return (
        <ListItem className={classes.itemLeaf} disableGutters {...other}>
          <Button
            component={props => (
              <Link activeClassName={classes.active} to={to} {...props} />
            )}
            className={classNames(classes.buttonLeaf, `depth-${depth}`)}
            classes={{ label: classes.buttonLabel }}
            disableRipple
            onClick={onClick}
            style={style}
          >
            <span>{title}</span>
            <Typography>{secondaryText}</Typography>
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem className={classes.item} disableGutters {...other}>
        <Button
          classes={{
            root: classes.button,
            label: openImmediately ? 'algolia-lvl0' : '',
          }}
          onClick={this.handleClick}
          style={style}
        >
          {title}
        </Button>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </ListItem>
    );
  }
}

export default withStyles(styles)(NavItem);
