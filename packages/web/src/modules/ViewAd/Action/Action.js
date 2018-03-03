import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { actions as dataActions } from 'store/firebase/data';
import SendMessage from 'components/SendMessage/SendMessage';
import RevealPhoneButton from '../RevealPhoneButton/RevealPhoneButton';

const Action = (props) => {
  const { ad, adId, currentUserId, markAdAsSold } = props

  if (ad.sold) {
    return null;
  }

  if (!ad.user) {
    return (
      <RevealPhoneButton ad={ad}>
        Contact seller
      </RevealPhoneButton>
    )
  }

  if (ad.user !== currentUserId) {
    return (
      <SendMessage
        placeholder="Ask a question"
        adId={adId}
        buyerId={currentUserId}
      />
    )
  }

  // current user is seller
  return (
    <Button
      variant="raised"
      color="primary"
      fullWidth
      onClick={() => markAdAsSold()}
    >
      Mark as sold
    </Button>
  )
}

const mapDispatchToProps = (dispatch, { adId }) =>
  bindActionCreators(
    {
      markAdAsSold: () => dataActions.markAdAsSold(adId),
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Action)
