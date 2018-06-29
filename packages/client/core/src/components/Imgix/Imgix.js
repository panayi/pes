import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { withProps } from 'recompose';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { buildUrl } from '@pesposa/core/src/services/imgix';
import omitProps from '../../utils/omitProps';
import Reimgix from './Reimgix/Reimgix';

// type Props = {
//   image: Image, // eslint-disable-line react/no-unused-prop-types
//   params: Object,
//   url: string,
//   lqip: boolean,
//   children: ?Function,
//   alt: string,
// };

const LQIP_PARAMS = { colorquant: 400, blur: 300, auto: 'format' };

const DEFAULT_PARAMS = { auto: 'compress,format' };

const Imgix = ({ url, params, lqip, children, alt, ...rest }) => {
  if (isNilOrEmpty(url)) {
    return R.isNil(children) ? null : children({});
  }

  return (
    <Reimgix lqipParams={LQIP_PARAMS} params={params} src={url} lqip={lqip}>
      {children || (({ src }) => <img {...rest} alt={alt} src={src} />)}
    </Reimgix>
  );
};

Imgix.defaultProps = {
  params: {},
  lqip: true,
  alt: '',
};

const fullPathSelector = R.pathOr('', ['image', 'fullPath']);

const urlSelector = createCachedSelector(
  fullPathSelector,
  R.unless(isNilOrEmpty, buildUrl),
)(fullPathSelector);

const paramsSelector = R.compose(
  R.merge(DEFAULT_PARAMS),
  propSelector(['params']),
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
