/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import { modelConnections, connectData } from 'services/connectData';
import { actions, selectors } from 'store/post';
import { createStructuredSelector } from 'reselect';
import { Button } from 'material-ui';
import { uidSelector } from 'store/auth/selectors';
import { factory as modalFactory } from 'store/modals';
import pickProps from 'utils/pickProps';
import withAnonymousUser from 'components/hocs/withAnonymousUser';
import PostForm from 'components/molecules/PostForm';

const mapDataToProps = {
  post: modelConnections.pendingPosts.one(uidSelector),
};

const mapStateToProps = createStructuredSelector({
  filesPath: selectors.pendingPostImagesPathSelector,
});

const mapDispatchToProps = {
  onChange: actions.savePendingPost,
  createPost: actions.createPost,
};

const connector = connectData(
  mapDataToProps,
  mapStateToProps,
  mapDispatchToProps,
);

const CreatePostContent = R.compose(
  withAnonymousUser,
  withState('created', 'setCreated', false),
  connector,
  pickProps(['post', 'filesPath', 'onChange']),
)(PostForm);

const CreatePostActions = connector(({ post, createPost }) => [
  <Button key={0} onClick={() => createPost(post)}>
    Post
  </Button>,
]);

export default modalFactory({
  content: CreatePostContent,
  actions: CreatePostActions,
});
