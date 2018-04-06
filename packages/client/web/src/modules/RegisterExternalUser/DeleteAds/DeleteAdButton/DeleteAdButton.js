import React from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import { removeExternalUserAd } from '@pesposa/core/src/client/ads';
import LoadingButton from '@pesposa/client-core/src/components/LoadingButton/LoadingButton';
import Button from '@pesposa/client-core/src/components/Button/Button';

export class DeleteAdButton extends React.Component {
  handleClick = async () => {
    const { adId, code, setIsDeleting, onDeleted, firebase } = this.props;
    setIsDeleting(true);
    await removeExternalUserAd(firebase, adId, code);
    onDeleted(adId);
    setIsDeleting(false);
  };

  render() {
    const { isDeleting, className } = this.props;
    const ButtonComponent = isDeleting ? LoadingButton : Button;

    return (
      <ButtonComponent
        className={className}
        variant="raised"
        color="primary"
        onClick={this.handleClick}
        fullWidth
      >
        Remove this ad from Pesposa
      </ButtonComponent>
    );
  }
}

export default R.compose(
  withState('isDeleting', 'setIsDeleting', false),
  withFirebase,
)(DeleteAdButton);
