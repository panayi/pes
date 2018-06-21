import React from 'react';
import * as R from 'ramda';
import { isFunction, noop } from 'ramda-adjunct';
import qs from 'querystringify';

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

  constructor(props) {
    super(props);

    const { src, params, useSrcParams, lqipParams, lqip } = props;
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

    this.state = {
      src:
        lqip && !Reimgix.cache[this.src.original]
          ? this.src.lqip
          : this.src.original,
    };

    this.image = null;
  }

  componentDidMount() {
    if (this.props.lqip) {
      this.image = document.createElement('img');
      this.image.addEventListener('load', this.handleOriginalLoad);
      this.image.src = this.src.original;
    }
  }

  componentWillUnmount() {
    if (this.props.lqip && this.image) {
      this.image.removeEventListener('load', this.handleOriginalLoad);
    }
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
