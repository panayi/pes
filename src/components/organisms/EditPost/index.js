/* @flow */
import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { withProps } from 'recompose';
import { Button } from 'material-ui';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions, selectors } from 'store/post';
import { factory as modalFactory } from 'store/modals';
import pickProps from 'utils/pickProps';
import PostForm from 'components/molecules/PostForm';

type Props = {
  filesPath: String,
  postId: string, // eslint-disable-line react/no-unused-prop-types
  post: Post,
};

const mapDispatchToProps = (dispatch: Dispatch, props: Props) =>
  bindActionCreators(
    {
      savePost: actions.savePost(props.postId, props.onSave),
    },
    dispatch,
  );

const EditPostContent = R.compose(
  withProps(
    createStructuredSelector({
      filesPath: selectors.postImagesPathSelector,
    }),
  ),
  pickProps(['post', 'filesPath']),
)(PostForm);

const EditPostActions = connect(null, mapDispatchToProps)(
  ({ post, savePost }) => [
    <Button key={0} onClick={() => savePost(post)}>
      Save
    </Button>,
  ],
);

export default modalFactory({
  content: EditPostContent,
  actions: EditPostActions,
});
