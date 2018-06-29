import React from 'react';
import * as R from 'ramda';
import { isFunction, noop } from 'ramda-adjunct';
import qs from 'querystringify';
import propsChanged from '@pesposa/core/src/utils/propsChanged';

// Based on https://github.com/renatorib/reimgix
// Slight modification to cache the images that were already downloaded,
// and disable lqip when that's true.
class Reimgix extends React.Component {
  static cache = {};

  static defaultProps = {
    useSrcParams: true,
    lqip: true,
    lqipParams: {
      px: '16',
      blur: '200',
      auto: 'format,compress',
    },
  };

  state = {
    src: null,
  };

  componentDidMount() {
    this.setup();
    const { lqip } = this.props;
    if (lqip) {
      this.image = document.createElement('img');
      this.image.addEventListener('load', this.handleOriginalLoad);
      this.image.src = this.src.original;
    }
  }

  /* eslint-disable */
  UNSAFE_componentWillUpdate(nextProps) {
    if (propsChanged(['src', 'params'], nextProps, this.props)) {
      this.setState({
        src: null,
      });
    }
  }
  /* eslint-enable */

  componentDidUpdate(prevProps) {
    if (propsChanged(['src', 'params'], prevProps, this.props)) {
      this.setup();

      const { lqip } = this.props;
      if (lqip) {
        this.image = document.createElement('img');
        this.image.addEventListener('load', this.handleOriginalLoad);
        this.image.src = this.src.original;
      }
    }
  }

  componentWillUnmount() {
    const { lqip } = this.props;
    if (lqip && this.image) {
      this.image.removeEventListener('load', this.handleOriginalLoad);
    }
  }

  setup() {
    const { src, params, useSrcParams, lqipParams, lqip } = this.props;
    const [path, search = ''] = src.split('?');
    let srcParams;

    /**
     * Create imgix params based on
     * 1. original src params (if this.props.useSrcParams: true)
     * 2. this.props.params (merged with src params)
     * 3. lqip purpose params (only on src.lqip)
     */

    try {
      srcParams = qs.parse(search) || {};
    } catch (e) {
      srcParams = {};
    }

    const srcOriginalParams = {
      ...(useSrcParams ? srcParams : {}),
      ...params,
    };

    const srcLqipParams = {
      ...srcOriginalParams,
      ...lqipParams,
    };

    this.src = {
      original: `${path}?${qs.stringify(srcOriginalParams)}`,
      lqip: `${path}?${qs.stringify(srcLqipParams)}`,
    };

    this.setState({
      src:
        lqip && !Reimgix.cache[this.src.original]
          ? this.src.lqip
          : this.src.original,
    });

    this.image = null;
  }

  handleOriginalLoad = () => {
    const { original } = this.src;
    Reimgix.cache[original] = true;
    this.setState({ src: original });
  };

  render() {
    const { children, render } = this.props;
    const renderFn = R.find(isFunction, [children, render, noop]);

    return renderFn({ ...this.state });
  }
}

export default Reimgix;
