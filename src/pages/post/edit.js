import React from 'react';
import * as R from 'ramda';
import { branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { replace as _replace } from 'react-router-redux';
import { isLoaded } from 'react-redux-firebase';
import needsUserWithId from 'components/hocs/needsUserWithId';
import propsSelector from 'utils/propsSelector';
import Modal from 'components/organisms/Modal';
import EditPostForm from 'components/smarts/EditPostForm';

const EditPost = ({ postId, post, replace }) => (
  <Modal
    defaultOpen
    onExited={() => replace(`/i/${postId}`)}
    ignoreBackdropClick
    ignoreEscapeKeyUp
  >
    <EditPostForm
      postId={postId}
      post={post}
    />
  </Modal>
);

const mapDispatchToProps = {
  replace: _replace,
};

export default R.compose(
  branch(
    // Wait for `post` to become available,
    // so that the form is properly initialized.
    R.compose(
      R.not,
      isLoaded,
      R.prop('post'),
    ),
    renderNothing,
  ),
  connect(null, mapDispatchToProps),
  needsUserWithId({
    redirectPath: (state, { postId }) => `/i/${postId}`,
    userSelector: R.compose(
      R.path(['post', 'user']),
      propsSelector,
    ),
  }),
)(EditPost);
