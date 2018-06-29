import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import ModeEditIcon from '@material-ui/icons/ModeEdit';
import propsSelector from '@pesposa/core/src/utils/propsSelector';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import requirePropToRender from '@pesposa/client-core/src/hocs/requirePropToRender';
import Button from '@pesposa/client-core/src/components/Button/Button';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import withUserWithId from '@pesposa/client-core/src/hocs/withUserWithId';
import EditAd from 'modules/PostAd/EditAd/EditAd';

// type Props = {
//   adId: string,
//   openModal: Function,
//   classes: Object,
//   children: React$Node,
// };

const styles = theme => ({
  root: {
    minHeight: 'auto',
    minWidth: 'auto',
    padding: theme.spacing.unit,
  },
});

const EditAdButton = ({ adId, openModal, children, classes, ...rest }) => (
  <React.Fragment>
    <Button
      className={classes.root}
      color="primary"
      {...rest}
      onClick={() => openModal('editAd', { adId })}
    >
      {children || <ModeEditIcon />}
    </Button>
    <ReduxModal id="editAd" content={EditAd} />
  </React.Fragment>
);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  requirePropToRender('ad'),
  withUserWithId(
    R.compose(
      R.path(['ad', 'seller']),
      propsSelector,
    ),
  ),
  connect(
    null,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(EditAdButton);
