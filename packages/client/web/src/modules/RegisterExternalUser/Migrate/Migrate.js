import React from 'react';
import * as R from 'ramda';
import { withStateHandlers } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import DoneIcon from '@material-ui/icons/CheckCircle';
import { migrateToUser } from '@pesposa/core/src/client/externalUsers';
import Button from '@pesposa/client-core/src/components/Button/Button';
import Spinner from '@pesposa/client-core/src/components/Spinner/Spinner';
import EmptyHero from '@pesposa/client-core/src/components/EmptyHero/EmptyHero';
import GeneralErrorMessage from '@pesposa/client-core/src/components/GeneralErrorMessage/GeneralErrorMessage';

const PENDING = 'pending';
const SUCCEEDED = 'succeeded';
const FAILED = 'failed';

const styles = theme => ({
  root: {
    minHeight: 200,
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    marginTop: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Migrate extends React.Component {
  componentDidMount() {
    this.migrate();
  }

  migrate = async () => {
    const {
      code,
      firebase,
      migrateStarted,
      migrateSucceeded,
      migrateFailed,
    } = this.props;
    try {
      migrateStarted();
      await migrateToUser(firebase, code);
      migrateSucceeded();
    } catch (error) {
      migrateFailed();
    }
  };

  navigateAway = callback => {
    const { closeModal } = this.props;
    closeModal();
    callback();
  };

  renderPending() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Spinner />
        <Typography className={classes.text} variant="headline">
          Please wait while connecting your ads with your account.
        </Typography>
      </React.Fragment>
    );
  }

  renderSucceeded() {
    const { goHome, goToProfile, classes } = this.props;

    return (
      <React.Fragment>
        <EmptyHero
          icon={DoneIcon}
          tagline="Your ads are now connected to your account!"
          small
        />
        <Button
          className={classes.button}
          color="primary"
          size="large"
          onClick={() => this.navigateAway(goHome)}
        >
          Go to Pesposa Home
        </Button>
        <Button
          className={classes.button}
          variant="raised"
          color="primary"
          size="large"
          onClick={() => this.navigateAway(goToProfile)}
        >
          View your ads
        </Button>
      </React.Fragment>
    );
  }

  renderFailed() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <GeneralErrorMessage message="Something went wrong and couldn't connect your ads with your account." />
        <Button
          className={classes.button}
          variant="raised"
          color="primary"
          onClick={this.migrate}
        >
          Try again
        </Button>
      </React.Fragment>
    );
  }

  renderContent() {
    const { status } = this.props;

    if (status === PENDING) {
      return this.renderPending();
    }

    if (status === SUCCEEDED) {
      return this.renderSucceeded();
    }

    if (status === FAILED) {
      return this.renderFailed();
    }

    return <Spinner />;
  }

  render() {
    const { DialogContent, classes } = this.props;
    return (
      <DialogContent>
        <div className={classes.root}>{this.renderContent()}</div>
      </DialogContent>
    );
  }
}

export default R.compose(
  withStateHandlers(
    {
      status: null,
    },
    {
      migrateStarted: () => () => ({
        status: PENDING,
      }),
      migrateSucceeded: () => () => ({
        status: SUCCEEDED,
      }),
      migrateFailed: () => () => ({
        status: FAILED,
      }),
    },
  ),
  withFirebase,
  withStyles(styles),
)(Migrate);
