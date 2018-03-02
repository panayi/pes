import React from 'react';
import { DialogTitle } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import CloseButton from '../../CloseButton/CloseButton';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  onlyActionWrap: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 6,
  },
  onlyAction: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

class DesktopTitle extends React.Component {
  renderDesktopAction() {
    const { closeButton, action, onClose } = this.props;

    return (
      <React.Fragment>
        {action}
        {closeButton && !action ? <CloseButton onClose={onClose} /> : null}
      </React.Fragment>
    );
  }

  render() {
    const { children, classes } = this.props;

    return children ? (
      <DialogTitle>
        {this.renderDesktopAction()}
        {children}
      </DialogTitle>
    ) : (
      <div className={classes.onlyActionWrap}>
        <div className={classes.onlyAction}>
          {this.renderDesktopAction(classes.onlyAction)}
        </div>
      </div>
    );
  }
}

DesktopTitle.defaultProps = {
  closeButton: false,
};

export default withStyles(styles)(DesktopTitle);
