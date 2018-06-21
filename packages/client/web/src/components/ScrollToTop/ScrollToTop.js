import React from 'react';
import { node, number, shape } from 'prop-types';
import { withRouter } from 'react-router-dom';
import debounceFn from 'lodash.debounce';

// Based on: https://github.com/ReactTraining/react-router/issues/3950#issuecomment-284964561

class ScrollToTop extends React.Component {
  static propTypes = {
    children: node.isRequired,
    location: shape({}),
    scrollCaptureDebounce: number,
    scrollSyncDebounce: number,
    scrollSyncAttemptLimit: number,
  };

  static defaultProps = {
    scrollCaptureDebounce: 50,
    scrollSyncDebounce: 100,
    scrollSyncAttemptLimit: 5,
    location: {},
  };

  constructor(props) {
    super(props);

    this.scrollSyncData = {
      x: 0,
      y: 0,
      attemptsRemaining: props.scrollSyncAttemptLimit,
    };

    const scrollCapture = () => {
      requestAnimationFrame(() => {
        const { pageXOffset: x, pageYOffset: y } = window;
        const { pathname } = this.props.location;

        // use browser history instead of router history
        // to avoid infinite history.replace loop
        const historyState = window.history.state || {};
        const { state = {} } = historyState;
        if (!state.scroll || state.scroll.x !== x || state.scroll.y !== y) {
          window.history.replaceState(
            {
              ...historyState,
              state: { ...state, scroll: { x, y } },
            },
            null,
            pathname,
          );
        }
      });
    };

    const _scrollSync = () => {
      requestAnimationFrame(() => {
        const { x, y, attemptsRemaining } = this.scrollSyncData;

        if (attemptsRemaining < 1) {
          return;
        }

        const { pageXOffset, pageYOffset } = window;
        if (
          y < window.document.body.scrollHeight &&
          (x !== pageXOffset || y !== pageYOffset)
        ) {
          window.scrollTo(x, y);
          this.scrollSyncData.attemptsRemaining = attemptsRemaining - 1;
          _scrollSync();
        }
      });
    };

    const scrollSync = (x = 0, y = 0) => {
      this.scrollSyncData = {
        x,
        y,
        attemptsRemaining: this.props.scrollSyncAttemptLimit,
      };
      _scrollSync();
    };

    this.debouncedScroll = debounceFn(
      scrollCapture,
      props.scrollCaptureDebounce,
    );
    this.debouncedScrollSync = debounceFn(scrollSync, props.scrollSyncDebounce);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.debouncedScrollSync(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
