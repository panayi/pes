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
    path = `/${finalCategory}/${finalLocation}`;
  } else if (finalLocation) {
    path = `/all/${finalLocation}`;
  } else if (finalCategory) {
    path = `/${finalCategory}`;
  }

  return <Link to={path} {...rest} />;
};

export default withProps(
  createStructuredSelector({
    currentLocation: routerSelectors.routeParamSelector('location'),
    currentCategory: routerSelectors.routeParamSelector('category'),
  }),
)(LinkToSearch);
