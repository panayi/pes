/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Page from '../../lib/components/Page';
import NewPost from '../../post/New';

type Props = {
  onCreate: Function,
};

const Post = (props: Props) => (
  <Page>
    <NewPost onCreate={() => props.onCreate()} />
  </Page>
);

const actions = {
  onCreate: () => push('/'),
};

export default connect(null, actions)(Post);
