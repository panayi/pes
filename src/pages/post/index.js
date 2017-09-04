import React, { Component } from 'react';
import Page from '../../lib/components/Page';
import NewPost from '../../Post/New';

export default class Post extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Page>
        <NewPost />
      </Page>
    );
  }
}
