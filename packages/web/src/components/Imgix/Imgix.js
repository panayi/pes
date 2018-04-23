/* @flow */
import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector, createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { withProps } from 'recompose';
import propSelector from '@pesposa/core/src/utils/propSelector';
import omitProps from 'utils/omitProps';
import { buildUrl } from 'services/imgix';
import Reimgix from './Reimgix/Reimgix';

type Props = {
  image: Image, // eslint-disable-line react/no-unused-prop-types
  params: Object,
  url: string,
  lqip: boolean,
  children: ?Function,
  alt: string,
};

const LQIP_PARAMS = { colorquant: 400, blur: 300, auto: 'format' };

const DEFAULT_PARAMS = { auto: 'compress,format' };

const Imgix = ({ url, params, lqip, children, alt, ...rest }: Props) => {
  if (isNilOrEmpty(url)) {
    return R.isNil(children) ? null : children({});
  }

  return (
    <Reimgix
      lqipParams={LQIP_PARAMS}
      params={params}
      src={url}
      lqip={lqip}
      className="hello"
    >
      {children || (({ src }) => <img {...rest} alt={alt} src={src} />)}
    </Reimgix>
  );
};

Imgix.defaultProps = {
  params: {},
  lqip: true,
  alt: '',
};

const fullPathSelector = R.path(['image', 'fullPath']);

const urlSelector = createCachedSelector(fullPathSelector, buildUrl)(
  fullPathSelector,
);

const paramsSelector = createSelector(
  propSelector('params'),
  R.merge(DEFAULT_PARAMS),
);

export default R.compose(
  withProps(
    createStructuredSelector({
      url: urlSelector,
      params: paramsSelector,
    }),
  ),
  omitProps(['image']),
)(Imgix);
