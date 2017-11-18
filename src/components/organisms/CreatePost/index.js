/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import { Button } from 'material-ui';
import { modelConnections, connectData } from 'services/connectData';
import { actions, selectors } from 'store/post';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withAnonymousUser from 'components/hocs/withAnonymousUser';
import PostModal from 'components/molecules/PostModal';
import PostForm from 'components/molecules/PostForm';
import { uidSelector } from 'store/auth/selectors';

type Props = {
  post: Post,
  filesPath: String,
  createPost: Function,
  savePendingPost: Function,
};

const CreatePost = (props: Props) => {
  const { post, filesPath, createPost, savePendingPost } = props;

  return (
    <PostModal
      openButtonProps={{
        children: 'Sell your stuff',
        color: 'contrast',
      }}
      actions={
        <Button onClick={() => createPost(post)}>
          Post
        </Button>
      }
      ignoreEscapeKeyUp
    >
      <PostForm
        post={post}
        filesPath={filesPath}
        onChange={savePendingPost}
      />
    </PostModal>
  );
};

const mapStateToProps = createStructuredSelector({
  filesPath: selectors.pendingPostImagesPathSelector,
});

const mapDispatchToProps = {
  createPost: actions.createPost,
  savePendingPost: actions.savePendingPost,
};

export default R.compose(
  withAnonymousUser,
  withState('created', 'setCreated', false),
  connectData({ post: modelConnections.pendingPosts.one(uidSelector) }),
  connect(mapStateToProps, mapDispatchToProps),
)(CreatePost);
