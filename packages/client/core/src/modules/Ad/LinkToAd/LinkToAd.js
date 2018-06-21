import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import id from '@pesposa/core/src/utils/id';
import Link from '../../../components/Link/Link';

const LinkToAd = ({ ad, component: Komponent, ...rest }) => (
  <Komponent to={`/i/${id(ad)}`} {...rest} />
);

LinkToAd.propTypes = {
  ad: PropTypes.shape({
    id: PropTypes.string,
  }),
  component: elementType,
};

LinkToAd.defaultProps = {
  ad: {},
  component: Link,
};

export default LinkToAd;
