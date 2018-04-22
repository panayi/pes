import React from 'react';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import ErrorIcon from 'material-ui-icons/Error';
import Button from 'components/Button/Button';
import GeneralErrorMessage from 'components/GeneralErrorMessage/GeneralErrorMessage';

const styles = theme => ({
  root: {
    maxWidth: 450,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.error.main,
  },
  generalError: {
    color: 'inherit',
  },
});

const ErrorModal = ({
  title,
  errorMsg,
  DialogContent,
  DialogTitle,
  DialogActions,
  closeModal,
  classes,
}) => (
    <React.Fragment>
      <DialogTitle
        title={
          <div className={classes.title}>
            <ErrorIcon className={classes.icon} />
            <span>{title}</span>
          </div>
        }
      />
      <DialogContent className={classes.root}>
        <Typography>
          {errorMsg || <GeneralErrorMessage className={classes.generalError} />}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal()}>Close</Button>
      </DialogActions>
    </React.Fragment>
  );

export default withStyles(styles)(ErrorModal);
