import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import { actions as modalActions } from 'store/modals';
import A from 'components/A/A';

const styles = () => ({
  link: {
    display: 'inline',
  },
});

const GeneralErrorMessage = ({ openModal, className, classes }) => (
  <Typography className={className} color="error">
    Something went wrong. Try again or{' '}
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

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(connect(null, mapDispatchToProps), withStyles(styles))(
  GeneralErrorMessage,
);
