/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import propsSelector from '@pesposa/core/src/utils/propsSelector';
import { actions as modalActions } from 'store/modals';
import requirePropToRender from 'hocs/requirePropToRender';
import withUserWithId from 'hocs/withUserWithId';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import EditAd from 'modules/PostAd/EditAd/EditAd';

type Props = {
  adId: string,
  openModal: Function,
  classes: Object,
};

const styles = theme => ({
  root: {
    minHeight: 'auto',
    minWidth: 'auto',
    padding: theme.spacing.unit,
  },
});

const EditAdLink = ({ adId, openModal, classes }: Props) => (
  <React.Fragment>
    <Button
      className={classes.root}
      color="primary"
      onClick={() => openModal('editAd', { adId })}
    >
      <ModeEditIcon />
    </Button>
    <ReduxModal id="editAd" content={EditAd} />
  </React.Fragment>
);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  requirePropToRender('ad'),
  withUserWithId(R.compose(R.path(['ad', 'user']), propsSelector)),
  connect(null, mapDispatchToProps),
  withStyles(styles),
)(EditAdLink);
