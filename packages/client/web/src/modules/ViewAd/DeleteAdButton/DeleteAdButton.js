import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import propsSelector from '@pesposa/core/src/utils/propsSelector';
import { actions as postAdActions } from '@pesposa/client-core/src/store/postAd';
import requirePropToRender from '@pesposa/client-core/src/hocs/requirePropToRender';
import withUserWithId from 'hocs/withUserWithId';
import Button from '@pesposa/client-core/src/components/Button/Button';
import Confirm from 'components/Confirm/Confirm';

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
  withUserWithId(R.compose(R.path(['ad', 'seller']), propsSelector)),
  connect(null, mapDispatchToProps),
  withRouter,
  withProps(({ adId, removeAd, history }) => ({
    onAccept: async () => {
      await removeAd(adId);
      history.replace('/');
    },
  })),
  withStyles(styles),
)(DeleteAdButton);
