/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Route } from 'react-router-dom';
import urlParamsSelector from 'utils/urlParamsSelector';
import Page from 'components/molecules/Page';
import { modelConnections, connectData } from 'services/connectData';
import Layout from 'components/organisms/Layout';
import ViewPost from './view';
import EditPost from './edit';

type Props = {
  postId: String,
  post: Post,
};

const PostPage = ({ post, postId }: Props) => (
  <Layout>
    <Page fixed>
      <ViewPost
        post={post}
        postId={postId}
      />
      <Route
        path="/i/:postId/edit"
        render={props => (
          <EditPost
            {...props}
            post={post}
            postId={postId}
          />
        )}
      />
    </Page>
  </Layout>
);

export default R.compose(
  withProps(createStructuredSelector({
    postId: R.compose(R.prop('postId'), urlParamsSelector),
  })),
  connectData({
    post: modelConnections.posts.one((state, props) => props.postId),
  }),
)(PostPage);
