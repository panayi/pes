import React, { Component } from 'react';
import * as R from 'ramda';
import { isValidNumber } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { withState, withProps } from 'recompose';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import StarsIcon from '@material-ui/icons/Stars';
import DoneIcon from '@material-ui/icons/CheckCircle';
import { actions as dataActions } from '@pesposa/client-core/src/store/firebase/data';
import Button from '@pesposa/client-core/src/components/Button/Button';
import EmptyHero from '@pesposa/client-core/src/components/EmptyHero/EmptyHero';
import Stars from './Stars/Stars';

const styles = theme => ({
  content: {
    padding: [0, theme.spacing.unit * 2.5],
    textAlign: 'center',
  },
  starsIcon: {
    width: 160,
    height: 160,
    color: theme.palette.primary.light,
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    lineHeight: '1.25em',
  },
  stars: {
    marginTop: theme.spacing.unit * 4.5,
    marginBottom: theme.spacing.unit,
  },
  input: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.palette.common.white,
    border: [1, 'solid', theme.palette.grey[300]],
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
  },
  textFieldFormLabel: {
    fontSize: 20,
  },
  success: {
    padding: [theme.spacing.unit * 2, 0],
    color: theme.palette.text.primary,
  },
});

class RateModal extends Component {
  handleSubmit = async () => {
    const { numberOfStars, body, createRating, setSuccess } = this.props;

    await createRating({ stars: numberOfStars, body });
    setSuccess(true);
  };

  renderInput() {
    const { numberOfStars, body, setBody, classes } = this.props;

    if (numberOfStars) {
      return (
        <TextField
          onChange={event => setBody(event.target.value)}
          value={body}
          label="How can we improve?"
          placeholder="What did you not like? What issues did you face?"
          classes={{
            root: classes.input,
          }}
          InputProps={{
            disableUnderline: true,
            classes: {
              root: classes.textFieldRoot,
              input: classes.textFieldInput,
            },
            autoFocus: true,
            rows: 5,
          }}
          InputLabelProps={{
            shrink: true,
            className: classes.textFieldFormLabel,
          }}
          multiline
        />
      );
    }

    return null;
  }

  renderRate() {
    const {
      DialogTitle,
      DialogContent,
      DialogActions,
      numberOfStars,
      setNumberOfStars,
      canSubmit,
      classes,
    } = this.props;

    return (
      <React.Fragment>
        <DialogTitle mobileOnly />
        <DialogContent>
          <div className={classes.content}>
            <StarsIcon className={classes.starsIcon} />
            <Typography className={classes.title} variant="title">
              How was your experience<br />with the new Pesposa?
            </Typography>
            <div className={classes.stars}>
              <Stars value={numberOfStars} onClick={setNumberOfStars} />
            </div>
            {this.renderInput()}
          </div>
        </DialogContent>
        <DialogActions>
          <Button disabled={!canSubmit} onClick={this.handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }

  renderSuccess() {
    const { DialogTitle, DialogContent, DialogActions, classes } = this.props;

    return (
      <React.Fragment>
        <DialogTitle mobileOnly />
        <DialogContent>
          <div className={classes.success}>
            <EmptyHero
              icon={DoneIcon}
              tagline="Thank you for your support!"
              small
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeModal}>Close</Button>
        </DialogActions>
      </React.Fragment>
    );
  }

  render() {
    const { success } = this.props;

    return success ? this.renderSuccess() : this.renderRate();
  }
}

export default R.compose(
  withState('numberOfStars', 'setNumberOfStars', null),
  withState('body', 'setBody', ''),
  withState('success', 'setSuccess', false),
  withProps(({ numberOfStars }) => ({
    canSubmit: isValidNumber(numberOfStars),
  })),
  connect(null, { createRating: dataActions.createRating }),
  withStyles(styles),
)(RateModal);
