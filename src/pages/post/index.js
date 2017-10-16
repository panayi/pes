/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Route } from 'react-router-dom';
import urlParamsSelector from '../../lib/selectors/urlParams';
import Page from '../../lib/components/Page';
import { modelConnections, connectData } from '../../firebase';
import Layout from '../layout';
import ViewPost from './view';
import EditPost from './edit';

type Props = {
  postId: String, // eslint-disable-line react/no-unused-prop-types
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
