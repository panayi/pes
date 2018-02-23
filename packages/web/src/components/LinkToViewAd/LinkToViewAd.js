import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import elementType from 'prop-types-extra/lib/elementType';
import id from 'utils/id';
import Link from 'components/Link/Link';

const LinkToViewAd = ({ ad, component: Komponent, ...rest }) => (
  <Komponent to={`/i${R.prop('legacy', ad) ? 'l' : ''}/${id(ad)}`} {...rest} />
);

LinkToViewAd.propTypes = {
  ad: PropTypes.shape({
    id: PropTypes.string,
    legacy: PropTypes.bool,
  }),
  component: elementType,
};

LinkToViewAd.defaultProps = {
  ad: {},
  component: Link,
};

export default LinkToViewAd;
