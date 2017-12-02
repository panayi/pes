/* @flow */
import React from 'react';
import * as R from 'ramda';
import propsSelector from 'utils/propsSelector';
import Link from 'components/molecules/Link';
import withUserWithId from 'components/hocs/withUserWithId';

type Props = {
  postId: String, // eslint-disable-line react/no-unused-prop-types
  post: Post,
};

const EditPostLink = withUserWithId(
  R.compose(R.path(['post', 'user']), propsSelector),
)(({ postId }) => <Link to={`/i/${postId}/edit`}>Edit</Link>);

const ViewPost = ({ post, postId }: Props) => (
  <div>
    {post.title}
    <EditPostLink post={post} postId={postId} />
  </div>
);

ViewPost.defaultProps = {
  post: {},
};

export default ViewPost;
