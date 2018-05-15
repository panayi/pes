import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import withSpinnerWhen from 'hocs/withSpinnerWhen';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import { actions as profileActions } from 'store/firebase/profile';

class ConfirmAdult extends React.Component {
  static propTypes = {
    onReject: PropTypes.func,
  };

  static defaultProps = {
    onReject: noop,
  };

  state = {
    pending: false,
  };

  handleAccept = async () => {
    const { confirmAdult } = this.props;
    this.setState({
      pending: true,
    });
    confirmAdult();
  };

  handleReject = () => {
    const { onReject, closeModal } = this.props;
    onReject();
    closeModal();
  };

  render() {
    const { DialogTitle, DialogContent, DialogActions, spinner } = this.props;
    const { pending } = this.state;

    return (
      <React.Fragment>
        {spinner}
        <DialogTitle
          title="You must be over 18 and agree to the terms below before continuing:"
          action={<span />}
        />
        <DialogContent>
          {pending ? <Spinner centered overlay /> : null}
          <Typography component="ul">
            <li>I have attained the Age of Majority in my country.</li>
            <li>
              The sexually explicit material I am viewing is for my own personal
              use and I will not expose any minors to the material.
            </li>
            <li>I desire to receive/view sexually explicit material.</li>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleReject}>I disagree</Button>
          <Button variant="raised" color="primary" onClick={this.handleAccept}>
            I agree
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  confirmAdult: profileActions.confirmAdult,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withSpinnerWhen(R.prop('isLoading'), {
    centered: true,
    overlay: true,
  }),
)(ConfirmAdult);
