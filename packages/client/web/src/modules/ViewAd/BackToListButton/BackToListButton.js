import React from 'react';
import { createStructuredSelector } from 'reselect';
import { selectors as paramsSelectors } from '@pesposa/client-core/src/store/search/params';
import connectSearch from '@pesposa/client-core/src/hocs/connectSearch';
import Link from '@pesposa/client-core/src/components/Link/Link';

const BackToListButton = ({ component: Komponent, category, ...rest }) => (
  <Komponent to={category ? `/c/${category}` : '/'} {...rest} />
);

BackToListButton.defaultProps = {
  component: Link,
};

const mapStateToProps = createStructuredSelector({
  category: paramsSelectors.categorySelector,
});

export default connectSearch(mapStateToProps)(BackToListButton);
