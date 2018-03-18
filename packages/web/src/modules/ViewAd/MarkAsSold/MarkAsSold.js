import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as dataActions } from 'store/firebase/data';
import Button from 'components/Button/Button';

const MarkAsSold = ({ variant, size, className, markAdAsSold }) => (
  <Button
    variant={variant}
    size={size}
    className={className}
    color="primary"
    fullWidth
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
