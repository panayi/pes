import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import queryString from 'query-string';
import { withProps, defaultProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import env from '@pesposa/core/src/config/env';
import requirePropToRender from 'hocs/requirePropToRender';

const BASE_URL = 'https://maps.googleapis.com/maps/api/staticmap';

const StaticMap = ({ src, width, height, className, alt }) => (
  <img
    className={className}
    src={src}
    alt={alt}
    width={`${width}px`}
    height={`${height}px`}
  />
);

/* eslint-disable react/no-unused-prop-types, react/require-default-props */
StaticMap.propTypes = {
  id: PropTypes.string.isRequired,
  center: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  mapType: PropTypes.oneOf(['roadmap', 'satellite', 'hybrid', 'terrain']),
  language: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
};
/* eslint-enable react/no-unused-prop-types, react/require-default-props */

const centerSelector = createSelector(
  propSelector('center'),
  ({ latitude, longitude }) => R.join(',', [latitude, longitude]),
);

const sizeSelector = createSelector(
  propSelector('width'),
  propSelector('height'),
  (width, height) => `${width}x${height}`,
);

const srcSelector = createCachedSelector(
  centerSelector,
  sizeSelector,
  propSelector('zoom'),
  propSelector('mapType'),
  propSelector('language'),
  R.compose(
    R.concat(`${BASE_URL}?`),
    queryString.stringify,
    R.reject(isNilOrEmpty),
    R.zipObj(['center', 'size', 'zoom', 'maptype', 'language', 'key']),
    R.append(env.googleApisKey),
    R.unapply(R.identity),
  ),
)(propSelector('id'));

export default R.compose(
  requirePropToRender('center'),
  defaultProps({
    zoom: 15,
    mapType: 'roadmap',
    language: null,
    className: null,
    alt: null,
  }),
  withProps(
    createStructuredSelector({
      src: srcSelector,
    }),
  ),
)(StaticMap);
