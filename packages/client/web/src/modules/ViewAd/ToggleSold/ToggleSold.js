import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as dataActions } from '@pesposa/client-core/src/store/firebase/data';
import Button from '@pesposa/client-core/src/components/Button/Button';

const ToggleSold = ({ ad, variant, size, className, toggleSold }) => (
  <Button
    variant={variant}
    size={size}
    className={className}
    color={ad.sold ? 'default' : 'primary'}
    fullWidth
    onClick={() => toggleSold()}
  >
    {ad.sold ? 'Sell it again' : 'Mark as sold'}
  </Button>
);

const mapDispatchToProps = (dispatch, { ad }) =>
  bindActionCreators(
    {
      toggleSold: () => dataActions.toggleSold(ad),
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(ToggleSold);
