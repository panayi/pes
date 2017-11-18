import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { replace as _replace } from 'react-router-redux';
import needsUserWithId from 'components/hocs/needsUserWithId';
import propsSelector from 'utils/propsSelector';
import EditPost from 'components/organisms/EditPost';

const EditPostPage = ({ postId, post, replace }) => (
  <EditPost
    postId={postId}
    post={post}
    modalProps={{
      onExited: () => replace(`/i/${postId}`),
    }}
  />
);

const mapDispatchToProps = {
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
