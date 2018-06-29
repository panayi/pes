import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withProps, branch } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { actions as postAdActions } from '../../../store/postAd';
import requirePropToRender from '../../../hocs/requirePropToRender';
import withUserWithId from '../../../hocs/withUserWithId';
import Button from '../../../components/Button/Button';
import Confirm from '../../../components/Confirm/Confirm';

const styles = theme => ({
  root: {
    minHeight: 'auto',
    minWidth: 'auto',
    padding: theme.spacing.unit,
  },
});

const DeleteAdButton = ({ onAccept, classes }) => (
  <Confirm
    message="Are you sure you want to delete this ad?"
    acceptLabel="Yes, delete it"
    rejectLabel="Cancel"
    onAccept={onAccept}
  >
    {({ openModal }) => (
      <Button className={classes.root} color="primary" onClick={openModal}>
        <DeleteIcon />
      </Button>
    )}
  </Confirm>
);

const mapDispatchToProps = {
  removeAd: postAdActions.removeAd,
};

export default R.compose(
  requirePropToRender('ad'),
  branch(
    R.complement(propSelector('alwaysRender')),
    withUserWithId(propSelector(['ad', 'seller'])),
  ),
  connect(
    null,
    mapDispatchToProps,
  ),
  withProps(({ adId, removeAd, onDeleted }) => ({
    onAccept: async () => {
      await removeAd(adId);
      if (onDeleted) {
        onDeleted();
      }
    },
  })),
  withStyles(styles),
)(DeleteAdButton);
