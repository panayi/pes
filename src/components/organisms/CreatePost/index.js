/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withState, withProps } from 'recompose';
import { modelConnections, connectData } from 'services/connectData';
import { actions, selectors } from 'store/post';
import { createStructuredSelector } from 'reselect';
import { Button } from 'material-ui';
import { uidSelector } from 'store/auth/selectors';
import pickProps from 'utils/pickProps';
import withAnonymousUser from 'components/hocs/withAnonymousUser';
import Modal from 'components/molecules/Modal';
import PostForm from 'components/molecules/PostForm';

const mapStateToProps = createStructuredSelector({
  filesPath: selectors.pendingPostImagesPathSelector,
});

const CreatePost = R.compose(
  withAnonymousUser,
  withState('created', 'setCreated', false),
  connectData(
    { post: modelConnections.pendingPosts.one(uidSelector) },
    mapStateToProps,
    { savePendingPost: actions.savePendingPost },
  ),
  pickProps(['post', 'filesPath', 'onChange']),
)(PostForm);

CreatePost.showModalButton = R.compose(
  connectData(
    { post: modelConnections.pendingPosts.one(uidSelector) },
    null,
    { createPost: actions.createPost },
  ),
  withProps(({ createPost, post }) => ({
    modalComponent: CreatePost,
    modalProps: {
      actions: [
        <Button key={0} onClick={() => createPost(post)}>
          Post
        </Button>,
      ],
    },
  })),
)(Modal.showButton);

export default CreatePost;
