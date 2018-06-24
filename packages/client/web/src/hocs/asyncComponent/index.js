import React from 'react';

// Taken from: https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
const asyncComponent = getComponent =>
  class AsyncComponent extends React.Component {
    static Component = null;

    state = {
      Component: AsyncComponent.Component,
    };

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
      // eslint-disable-next-line react/destructuring-assignment
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;

      if (Component) {
        return <Component {...this.props} />;
      }

      return null;
    }
  };

export default asyncComponent;
