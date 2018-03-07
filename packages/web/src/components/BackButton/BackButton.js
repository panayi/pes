import React from 'react';
import { withLastLocation } from 'react-router-last-location';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import Link from 'components/Link/Link';

const BackButton = ({
  component: Komponent,
  lastLocation,
  defaultLocation,
  ...rest
}) => (
  <Komponent {...rest} to={lastLocation || defaultLocation}>
    <KeyboardArrowLeft />
  </Komponent>
);

BackButton.defaultProps = {
  defaultLocation: '/',
  component: Link,
};

export default withLastLocation(BackButton);
