/* @flow */
import React from 'react';
import R from 'ramda';
import { withProps } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Page from '../../lib/components/Page';

type Props = {
  postId: String,
  post: Post,
};

const PostView = ({ post }: Props) => (
  <Page>
    <div>
      {post.title}
    </div>
  </Page>
);

PostView.defaultProps = {
  post: {},
};

export default R.compose(
  withProps((props: Props) => ({
    postId: R.path(['match', 'params', 'postId'], props),
  })),
  firebaseConnect(({ postId }) => ([`posts/${postId}`])),
  connect((state, props) => ({
    post: R.path(['firebase', 'data', 'posts', props.postId], state),
  })),
)(PostView);
