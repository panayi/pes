import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { lifecycle } from 'recompose';
import { Container, Image, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import base from './app/api/rebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Container>
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
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  posts: [],
};

export default R.compose(
  lifecycle({
    componentWillMount() {
      base.bindToState('posts', {
        context: this,
        state: 'posts',
        asArray: true,
      });
    },
  }),
)(App);
