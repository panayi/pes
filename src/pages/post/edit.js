import { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { replace as _replace } from 'react-router-redux';
import needsUserWithId from 'components/hocs/needsUserWithId';
import propsSelector from 'utils/propsSelector';
import EditPost from 'components/organisms/EditPost';

class EditPostPage extends Component {
  componentWillMount() {
    const { post, postId, showModal, replace } = this.props;
    showModal({
      post,
      postId,
      onSave: this.hideModal,
      onExited: () => replace(`/i/${postId}`),
    });
  }

  componentWillUnmount() {
    this.props.hideModal();
  }

  hideModal = () => {
    this.props.hideModal();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  showModal: EditPost.showAction,
  hideModal: EditPost.hideAction,
  replace: _replace,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  needsUserWithId({
    redirectPath: (state, { postId }) => `/i/${postId}`,
    userSelector: R.compose(
      R.path(['post', 'user']),
      propsSelector,
    ),
  }),
)(EditPostPage);
