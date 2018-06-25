import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import HighlightMatch from 'components/HighlightMatch';
import ScrollableList from 'components/ScrollableList';
import FirebaseConsoleLink from 'components/FirebaseConsoleLink/FirebaseConsoleLink';

const getSecondaryText = R.prop('url');

const SourceItem = props => {
  const { hit, image, getFirebasePath, ...rest } = props;
  const { name, matches = [] } = hit;
  const nameMatches = matches.name;
  const primary = nameMatches ? (
    <HighlightMatch matches={nameMatches} text={name} />
  ) : (
    name
  );

  return (
    <ScrollableList.item
      primary={primary}
      secondary={getSecondaryText(hit)}
      image={image}
      action={<FirebaseConsoleLink firebasePath={getFirebasePath(hit)} />}
      {...rest}
    />
  );
};

SourceItem.propTypes = {
  hit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    matches: PropTypes.shape({}),
  }).isRequired,
  style: PropTypes.shape({}),
};

SourceItem.defaultProps = {
  style: null,
};

const imageSelector = createCachedSelector(
  propSelector(['hit', 'images']),
  R.compose(
    R.head,
    R.values,
    R.defaultTo({}),
  ),
)(propSelector(['hit', 'id']));

export default withProps(
  createStructuredSelector({
    image: imageSelector,
  }),
)(SourceItem);
