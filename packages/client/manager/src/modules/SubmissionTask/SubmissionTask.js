import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import CreateSubmissionTask from './CreateSubmissionTask/CreateSubmissionTask';
import EditSubmissionTask from './EditSubmissionTask/EditSubmissionTask';

const styles = theme => ({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    paddingRight: theme.spacing.unit / 2,
  },
});

const SubmissionTask = ({ submissionTaskId, submissionTasks, basePath }) =>
  submissionTaskId ? (
    <EditSubmissionTask
      submissionTaskId={submissionTaskId}
      submissionTasks={submissionTasks}
      basePath={basePath}
    />
  ) : (
    <CreateSubmissionTask basePath={basePath} />
  );

export default R.compose(
  withProps(props => ({
    submissionTaskId: R.path(['match', 'params', 'submissionTaskId'], props),
  })),
  withStyles(styles),
)(SubmissionTask);
