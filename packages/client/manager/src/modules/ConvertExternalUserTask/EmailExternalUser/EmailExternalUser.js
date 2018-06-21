import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as externalUserEngagementChannels from '@pesposa/core/src/config/externalUserEngagementChannels';
import AsyncAction from '@pesposa/client-core/src/components/AsyncAction/AsyncAction';
import Button from '@pesposa/client-core/src/components/Button/Button';
import LoadingButton from '@pesposa/client-core/src/components/LoadingButton/LoadingButton';
import A from '@pesposa/client-core/src/components/A/A';
import { actions } from 'store/convertExternalUserTasks';
import LabelValue from '../../../components/LabelValue/LabelValue';

const styles = theme => ({
  leftButton: {
    marginRight: theme.spacing.unit,
  },
});

class EmailExternalUser extends React.Component {
  sendEmail = async () => {
    const { externalUserId, adId, sendEmail } = this.props;
    return sendEmail(externalUserId, adId);
  };

  renderActions = ({ callAction, isPending, isSuccess, isFail }) => {
    const { closeModal, classes } = this.props;
    const ButtonComponent = isPending ? LoadingButton : Button;
    const button = (
      <ButtonComponent
        variant="raised"
        color="primary"
        onClick={() => callAction()}
      >
        Send email
      </ButtonComponent>
    );

    if (isPending) {
      return button;
    }

    if (isSuccess) {
      return (
        <React.Fragment>
          <Button className={classes.leftButton} onClick={() => closeModal()}>
            Close
          </Button>
          <Button variant="raised" color="primary" disabled>
            Success!
          </Button>
        </React.Fragment>
      );
    }

    if (isFail) {
      return (
        <React.Fragment>
          <Button className={classes.leftButton} onClick={() => closeModal()}>
            Close
          </Button>
          <Typography>
            Something went wrong. Please{' '}
            <A onClick={() => callAction()}>try again</A>.
          </Typography>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Button className={classes.leftButton} onClick={() => closeModal()}>
          Cancel
        </Button>
        {button}
      </React.Fragment>
    );
  };

  render() {
    const {
      name,
      email,
      emailEngagements,
      messageEngagements,
      DialogTitle,
      DialogContent,
      DialogActions,
    } = this.props;

    return (
      <React.Fragment>
        <DialogTitle title={`Confirm sending an email to ${name} (${email})`} />
        <DialogContent>
          <LabelValue
            label={
              <span>
                Total <strong>email</strong> engagements so far
              </span>
            }
            value={emailEngagements}
          />
          <LabelValue
            label={
              <span>
                Total <strong>message</strong> engagements so far
              </span>
            }
            value={messageEngagements}
          />
        </DialogContent>
        <DialogActions>
          <AsyncAction action={this.sendEmail}>
            {this.renderActions}
          </AsyncAction>
        </DialogActions>
      </React.Fragment>
    );
  }
}

const createEngagementsSelector = channel =>
  createSelector(
    propSelector('engagements'),
    R.compose(
      R.length,
      R.filter(R.propEq('channel', channel)),
      R.values,
      R.defaultTo({}),
    ),
  );

const emailEngagementsSelector = createEngagementsSelector(
  externalUserEngagementChannels.EMAIL,
);
const messageEngagementsSelector = createEngagementsSelector(
  externalUserEngagementChannels.MANUAL_MESSAGE,
);

const mapDispatchToProps = {
  sendEmail: actions.sendEmail,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withProps(
    createStructuredSelector({
      emailEngagements: emailEngagementsSelector,
      messageEngagements: messageEngagementsSelector,
    }),
  ),
  withStyles(styles),
)(EmailExternalUser);
