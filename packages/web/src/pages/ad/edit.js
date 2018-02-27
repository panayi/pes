import { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { replace as _replace } from 'react-router-redux';
import propsSelector from '@pesposa/core/src/utils/propsSelector';
import { modals } from 'store/modals';
import needsUserWithId from 'hocs/needsUserWithId';

class EditAdPage extends Component {
  componentWillMount() {
    const { ad, adId, showModal, replace } = this.props;
    showModal({
      ad,
      adId,
      onSave: this.hideModal,
      onExited: () => replace(`/i/${adId}`),
    });
  }

  componentWillUnmount() {
    this.hideModal();
  }

  hideModal = () => {
    this.props.hideModal();
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  showModal: modals.editAd.showAction,
  hideModal: modals.editAd.hideAction,
  replace: _replace,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  needsUserWithId({
    redirectPath: (state, { adId }) => `/i/${adId}`,
    userSelector: R.compose(R.path(['ad', 'user']), propsSelector),
  }),
)(EditAdPage);
