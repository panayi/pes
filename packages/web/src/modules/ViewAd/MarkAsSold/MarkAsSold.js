import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as dataActions } from 'store/firebase/data';
import Button from 'components/Button/Button';

const MarkAsSold = ({ markAdAsSold, ...rest }) => (
  <Button
    variant="raised"
    color="primary"
    fullWidth
    {...rest}
    onClick={() => markAdAsSold()}
  >
    Mark as sold
  </Button>
);

const mapDispatchToProps = (dispatch, { adId }) =>
  bindActionCreators(
    {
      markAdAsSold: () => dataActions.markAdAsSold(adId),
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(MarkAsSold);
