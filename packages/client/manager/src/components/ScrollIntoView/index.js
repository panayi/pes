import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

class ScrollIntoView extends Component {
  static propTypes = {
    children: PropTypes.node,
    when: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    when: false,
  };

  componentDidMount() {
    this.maybeScrollIntoView();
  }

  maybeScrollIntoView = () => {
    const { when } = this.props;

    if (when && this.node) {
      scrollIntoViewIfNeeded(this.node, { centerIfNeeded: true });
    }
  };

  render() {
    return (
      <div
        ref={node => {
          this.node = node;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ScrollIntoView;
