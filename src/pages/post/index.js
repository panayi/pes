import React, { Component } from 'react';
import { Flex, Button } from 'rebass';
import Page from '../../lib/components/Page';
import Input from '../../lib/components/Input';

export default class Post extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  render() {
    return (
      <Page>
        <form onSubmit={this.handleSubmit}>
          <Flex column>
            <Input
              id="title"
              label="Title"
            />
            <Input
              id="description"
              label="Description"
            />
          </Flex>
          <Button type="submit">Post</Button>
        </form>
      </Page>
    );
  }
}
