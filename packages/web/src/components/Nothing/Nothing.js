import { Component } from 'react';

export default class Nothing extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}
