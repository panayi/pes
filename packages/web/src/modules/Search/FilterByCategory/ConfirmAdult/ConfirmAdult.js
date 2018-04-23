import React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import { actions as profileActions } from 'store/firebase/profile';

class ConfirmAdult extends React.Component {
  state = {
    pending: false,
  };

  handleAccept = async () => {
    const { onAccept, confirmAdult, closeModal } = this.props;
    this.setState({
      pending: true,
    });
    await confirmAdult();
    onAccept();
    closeModal();
  };

  handleReject = () => {
    const { onReject, closeModal } = this.props;
    if (onReject) {
      onReject();
    }
    closeModal();
  };

  render() {
    const { DialogTitle, DialogContent, DialogActions } = this.props;
    const { pending } = this.state;

    return (
      <React.Fragment>
        <DialogTitle title="You must be over 18 and agree to the terms below before continuing:" />
        <DialogContent>
          {pending ? <Spinner centered overlay /> : null}
          {/* <Typography variant="button">
            You must be over 18 and agree to the terms below before continuing:
          </Typography> */}
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
          <Button onClick={this.handleReject}>I disagree, take me back</Button>
          <Button variant="raised" color="primary" onClick={this.handleAccept}>
            I agree, show me&nbsp;<u>Personals</u>&nbsp;listings
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  confirmAdult: profileActions.confirmAdult,
};

export default connect(null, mapDispatchToProps)(ConfirmAdult);
