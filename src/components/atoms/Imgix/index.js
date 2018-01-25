/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { buildUrl } from 'services/imgix';

type Props = {
  image: Image, // eslint-disable-line react/no-unused-prop-types
  alt: string,
  url: string,
  width: ?number,
  className: ?string,
};

const Imgix = ({ url, width, alt, className }: Props) => (
  <img src={url} width={width} alt={alt} className={className} />
);

Imgix.defaultProps = {
  alt: '',
  auto: ['compress'],
  className: null,
};

export default withProps(({ image, w, ...rest }) => ({
  url: buildUrl(image.fullPath, R.omit(['alt'], rest)),
  width: w,
}))(Imgix);
