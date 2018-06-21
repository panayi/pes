import React from 'react';
import * as R from 'ramda';
import { WindowScroller } from 'react-virtualized';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const SCROLLTOP_THRESHOLD = 600;

const styles = theme => ({
  root: {
    position: 'fixed',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,
  },
  icon: {
    width: '1.4em',
    height: '1.4em',
  },
});

class BackToTopButton extends React.Component {
  static scrollToTop() {
    window.scrollTo(0, 0);
  }

  renderContent = ({ scrollTop }) => {
    const { classes } = this.props;

    if (scrollTop < SCROLLTOP_THRESHOLD) {
      return null;
    }

    return (
      <Button
        variant="fab"
        color="secondary"
        className={classes.root}
        onClick={BackToTopButton.scrollToTop}
      >
        <ArrowUpIcon className={classes.icon} />
      </Button>
    );
  };

  render() {
    return <WindowScroller>{this.renderContent}</WindowScroller>;
  }
}

export default R.compose(withStyles(styles))(BackToTopButton);
