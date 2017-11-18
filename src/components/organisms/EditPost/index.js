/* @flow */
import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { withProps } from 'recompose';
import { Button } from 'material-ui';
import { actions, selectors } from 'store/post';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PostModal from 'components/molecules/PostModal';
import PostForm from 'components/molecules/PostForm';

type Props = {
  filesPath: String,
  postId: string, // eslint-disable-line react/no-unused-prop-types
  post: Post,
  modalProps: Object,
  onSubmit: Function,
};

const EditPost = (props: Props) => {
  const { post, filesPath, modalProps, onSubmit } = props;

  return (
    <PostModal
      openButtonProps={{
        children: 'Sell your stuff',
        color: 'contrast',
      }}
      actions={
        <Button onClick={onSubmit}>
          Save
        </Button>
      }
      ignoreEscapeKeyUp
      {...modalProps}
    >
      <PostForm
        post={post}
        filesPath={filesPath}
      />
    </PostModal>
  );
};

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => bindActionCreators({
  onSubmit: actions.savePost(props.postId, props.onSave),
}, dispatch);

export default R.compose(
  withProps(createStructuredSelector({
    filesPath: selectors.postImagesPathSelector,
  })),
  connect(null, mapDispatchToProps),
  // TODO: need a `withUser(post.user)` to make sure the post belongs to the logged-in user
)(EditPost);
