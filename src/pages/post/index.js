/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import Layout from '../../layout';
import NewPost from '../../post/New';
import EditPost from '../../post/Edit';

const NewPostPage = connect(null, { onCreate: () => push('/') })(NewPost);

const Post = () => (
  <Layout>
    <Switch>
      <Route path="/p/:postId" component={EditPost} />
      <Route exact path="/p" component={NewPostPage} />
    </Switch>
  </Layout>
);


export default Post;
