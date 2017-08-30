import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Container, Grid, Menu, Image, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import 'semantic-ui-css/semantic.min.css';

export class Home extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    posts: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    categories: [],
    posts: [],
  };

  render() {
    const { categories, posts } = this.props;

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

export default R.compose(
  firebaseConnect([
    'categories',
    'posts',
  ]),
  connect(state => ({
    categories: state.firebase.data.categories,
    posts: state.firebase.data.posts,
  })),
)(Home);
