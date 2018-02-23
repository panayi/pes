import React from 'react';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { selectors as routerSelectors } from 'store/router';
import Link from 'components/Link/Link';

const LinkToSearch = ({
  location,
  category,
  currentLocation,
  currentCategory,
  ...rest
}) => {
  const finalLocation = location || currentLocation;
  const finalCategory = category || currentCategory;

  let path = '/';
  if (finalLocation && finalCategory) {
    path = `/${finalLocation}/${finalCategory}`;
  } else if (finalLocation) {
    path = `/${finalLocation}`;
  } else if (finalCategory) {
    path = `/c/${finalCategory}`;
  }

  return <Link to={path} {...rest} />;
};

export default withProps(
  createStructuredSelector({
    currentLocation: routerSelectors.routeParamSelector('location'),
    currentCategory: routerSelectors.routeParamSelector('category'),
  }),
)(LinkToSearch);
