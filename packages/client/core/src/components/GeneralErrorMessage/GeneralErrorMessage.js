import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { actions as modalActions } from '../../store/modals';
import A from '../A/A';

const styles = () => ({
  link: {
    display: 'inline',
    textDecoration: 'underline',
  },
});

const GeneralErrorMessage = ({ message, openModal, className, classes }) => (
  <Typography className={className} color="error">
    {message} Try again or{' '}
    <A
      className={classes.link}
      onClick={() => openModal('support')}
      role="button"
      tabIndex="-1"
    >
      contact support
    </A>.
  </Typography>
);

GeneralErrorMessage.defaultProps = {
  message: 'Something went wrong.',
};

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(GeneralErrorMessage);
