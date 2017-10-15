/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import propsSelector from '../../lib/selectors/props';
import Layout from '../../layout';
import Content from '../../lib/components/Content';
import Link from '../../lib/components/Link';
import withUserWithId from '../../auth/visibility/withUserWithId';

type Props = {
  postId: String, // eslint-disable-line react/no-unused-prop-types
  post: Post,
};

const EditPostLink = withUserWithId(R.compose(
  R.path(['post', 'user']),
  propsSelector,
))(({ postId }) => (
  <Link to={`/p/${postId}`}>
    Edit
  </Link>
));

const PostView = ({ post, postId }: Props) => (
  <Layout>
    <Content>
      {post.title}
      <EditPostLink
        post={post}
        postId={postId}
      />
    </Content>
  </Layout>
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
