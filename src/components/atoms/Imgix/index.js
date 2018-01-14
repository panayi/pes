/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { buildUrl } from 'services/imgix';

type Props = {
  image: Image, // eslint-disable-line react/no-unused-prop-types
  alt: string,
  url: string,
};

const Imgix = ({ url, alt }: Props) => <img src={url} alt={alt} />;

Imgix.defaultProps = {
  alt: '',
  auto: ['compress'],
};

export default withProps(({ image, ...rest }) => ({
  url: buildUrl(image.fullPath, R.omit(['alt'], rest)),
}))(Imgix);
