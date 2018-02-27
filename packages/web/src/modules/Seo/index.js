import React from 'react';
import PropTypes from 'prop-types';
import Base from './Base/Base';
import CanonicalUrl from './CanonicalUrl/CanonicalUrl';
import Title from './Title/Title';
import Description from './Description/Description';
import Image from './Image/Image';
import Facebook from './Facebook/Facebook';
import Twitter from './Twitter/Twitter';

const Seo = ({ path, title, description, image, facebook, twitter }) => (
  <React.Fragment>
    <Base />
    {path && <CanonicalUrl path={path} />}
    {title && <Title>{title}</Title>}
    {description && <Description>{description}</Description>}
    {image && <Image>{image}</Image>}
    {facebook && <Facebook {...facebook} />}
    {twitter && <Twitter {...twitter} />}
  </React.Fragment>
);

Seo.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  facebook: PropTypes.shape({
    siteName: PropTypes.string,
    userId: PropTypes.string,
    appId: PropTypes.string,
  }),
  twitter: PropTypes.shape({
    handle: PropTypes.string,
  }),
};

Seo.defaultProps = {
  path: null,
  title: null,
  description: null,
  image: null,
  facebook: null,
  twitter: null,
};

export default Seo;
