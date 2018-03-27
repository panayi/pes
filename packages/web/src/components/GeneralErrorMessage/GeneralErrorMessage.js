import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import { actions as modalActions } from 'store/modals';

const styles = () => ({
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
});

const GeneralErrorMessage = ({ openModal, classes }) => (
  <Typography color="error">
    Something went wrong. Try again or{' '}
    <a
      className={classes.link}
      onClick={() => openModal('support')}
      role="button"
      tabIndex="-1"
    >
      contact support
    </a>.
  </Typography>
);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(connect(null, mapDispatchToProps), withStyles(styles))(
  GeneralErrorMessage,
);
