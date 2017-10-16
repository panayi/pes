/* @flow */
import React from 'react';
import * as R from 'ramda';
import propsSelector from '../../lib/selectors/props';
import Layout from '../layout';
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
  <Link to={`/i/${postId}/edit`}>
    Edit
  </Link>
));

const ViewPost = ({ post, postId }: Props) => (
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

ViewPost.defaultProps = {
  post: {},
};

export default ViewPost;
