import React, { Component } from 'react';
import R from 'ramda';
import { Container, Grid, Menu, Image, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import base from '../lib/api/rebase';

export default class Home extends Component {
  state = {
    categories: [],
    posts: [],
  }

  componentWillMount() {
    base.bindToState('posts', {
      context: this,
      state: 'posts',
      asArray: true,
    });
    base.bindToState('categories', {
      context: this,
      state: 'categories',
      asArray: true,
    });
  }

  render() {
    const { categories, posts } = this.state;

    return (
      <Container fluid style={{ marginTop: '7em' }}>
        <Grid>
          <Grid.Column width={2}>
            <Menu pointing secondary vertical>
              <Menu.Item header>Categories</Menu.Item>
              {R.map(category => (
                <Menu.Item key={category.name}>
                  {category.name}
                </Menu.Item>
              ), categories)}
            </Menu>
          </Grid.Column>
          <Grid.Column width={14}>
            <Card.Group>
              {
                R.map(post => (
                  <Card key={post.oldId + post.categoryChild} href={post.permalink} target="_blank">
                    <Image
                      src="http://via.placeholder.com/400x200"
                      alt={post.title}
                    />
                    <Card.Content>
                      <Card.Header>
                        {post.title}
                      </Card.Header>
                      <Card.Meta>
                        {post.oldId}
                      </Card.Meta>
                      <Card.Description>
                        <div dangerouslySetInnerHTML={{ __html: post.body }} />
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      {post.phone}
                    </Card.Content>
                  </Card>
                ), posts)
              }
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
