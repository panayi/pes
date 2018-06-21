import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import Button from '@pesposa/client-core/src/components/Button/Button';
import { actions as submissionTasksActions } from 'store/submissionTasks';
import BaseSubmissionTask from '../BaseSubmissionTask/BaseSubmissionTask';

const styles = theme => ({
  content: {
    minWidth: 900,
    [theme.breakpoints.down(theme.map.tablet)]: {
      minWidth: 0,
      display: 'block',
      marginBottom: theme.spacing.unit * 3,
    },
  },
  adForm: {
    [theme.breakpoints.down(theme.map.tablet)]: {
      padding: 0,
    },
  },
  sidebar: {
    [theme.breakpoints.down(theme.map.tablet)]: {
      width: 'auto',
      margin: [theme.spacing.unit * 2, 0],
    },
  },
});

class CreateSubmissionTask extends React.Component {
  handleCreateClick = async ({ submission, uploadImages }) => {
    const { basePath, create, history } = this.props;
    const createdId = await create(submission);
    await uploadImages(
      `${modelPaths.SUBMISSION_TASKS.string}/${createdId}/submission/images`,
    );
    history.push(`${basePath}/${createdId}`);
  };

  renderContent = baseProps => {
    const { DialogActions } = this.props;

    return (
      <DialogActions>
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.handleCreateClick(baseProps)}
        >
          Create
        </Button>
      </DialogActions>
    );
  };

  render() {
    const { DialogTitle, DialogContent, classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle title="Submit an ad" />
        <BaseSubmissionTask
          component={DialogContent}
          classes={classes}
          isLoaded
        >
          {this.renderContent}
        </BaseSubmissionTask>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  create: submissionTasksActions.create,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withRouter,
  withStyles(styles),
)(CreateSubmissionTask);
