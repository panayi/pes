import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import withSpinnerWhen from '@pesposa/client-core/src/hocs/withSpinnerWhen';
import Button from '@pesposa/client-core/src/components/Button/Button';
import { actions as submissionTasksActions } from 'store/submissionTasks';
import ApproveButton from 'components/ApproveButton/ApproveButton';
import RejectButton from 'components/RejectButton/RejectButton';
import BaseSubmission from '../BaseSubmissionTask/BaseSubmissionTask';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 64,
    padding: theme.spacing.unit * 2,
    borderTop: [1, 'solid', theme.palette.divider],
  },
  button: {
    margin: theme.spacing.unit,
  },
  sidebar: {
    borderLeft: [1, 'solid', theme.palette.divider],
  },
});

class EditSubmissionTask extends React.Component {
  handleSaveClick = async submission => {
    const { submissionTaskId, updateSubmission } = this.props;
    return updateSubmission(submissionTaskId, submission);
  };

  handleAcceptClick = async ({ submission, dirty, validate }) => {
    const { submissionTaskId, accept } = this.props;
    const images = R.path(
      ['submissionTask', 'submission', 'images'],
      this.props,
    );
    const finalSubmission = R.merge(submission, { images });
    if (dirty) {
      await this.handleSaveClick(finalSubmission);
    }
    validate();
    return accept(submissionTaskId, finalSubmission);
  };

  handleRejectClick = async () => {
    const { submissionTaskId, reject } = this.props;
    return reject(submissionTaskId);
  };

  renderHeader = formProps => {
    const { submission, dirty } = formProps;
    const { classes } = this.props;

    return (
      <div className={classes.actions}>
        <Button
          className={classes.button}
          disabled={!dirty}
          onClick={() => this.handleSaveClick(submission)}
        >
          Save
        </Button>
        <RejectButton
          className={classes.button}
          onClick={() => this.handleRejectClick()}
        >
          Reject
        </RejectButton>
        <Tooltip
          id="tooltip-accept"
          title="Clicking this button will publish the ad"
        >
          <ApproveButton
            className={classes.button}
            onClick={() => this.handleAcceptClick(formProps)}
          >
            {dirty ? 'Save & Publish' : 'Publish'}
          </ApproveButton>
        </Tooltip>
      </div>
    );
  };

  render() {
    const { submissionTaskId, submissionTask, spinner, classes } = this.props;
    const imageFilesPath = `${
      modelPaths.SUBMISSION_TASKS.string
    }/${submissionTaskId}/submission/images`;

    return (
      <BaseSubmission
        submissionId={submissionTaskId}
        submissionTask={submissionTask}
        renderHeader={this.renderHeader}
        imageFilesPath={imageFilesPath}
        classes={{ sidebar: classes.sidebar }}
      >
        {() => spinner}
      </BaseSubmission>
    );
  }
}

const mapDataToProps = {
  submissionTask: models.submissionTasks.one(
    propSelector(['submissionTaskId']),
  ),
};

const mapDispatchToProps = {
  updateSubmission: submissionTasksActions.updateSubmission,
  accept: submissionTasksActions.accept,
  reject: submissionTasksActions.reject,
};

export default R.compose(
  connectData(mapDataToProps, null, mapDispatchToProps),
  withSpinnerWhen(R.complement(R.path(['isLoaded', 'submissionTask'])), {
    centered: true,
    overlay: true,
  }),
  withRouter,
  withStyles(styles),
)(EditSubmissionTask);
