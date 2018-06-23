import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import propSelector from '@pesposa/core/src/utils/propSelector';
import HighlightMatch from 'components/HighlightMatch';
import ScrollableList from 'components/ScrollableList';
import FirebaseConsoleLink from 'components/FirebaseConsoleLink/FirebaseConsoleLink';

const namePath = ['externalUser', 'profile', 'name'];

const ConvertExternalUserTaskItem = props => {
  const { hit, engagementsCount, getFirebasePath, ...rest } = props;
  const { matches = [] } = hit;
  const name = R.path(namePath, hit);
  const nameMatches = R.path(namePath, matches);
  const primary = nameMatches ? (
    <HighlightMatch matches={nameMatches} text={name} />
  ) : (
    name
  );
  const hasEngagements = engagementsCount > 0;
  const secondaryText = hasEngagements
    ? `${engagementsCount} engagements`
    : 'No engagements';

  return (
    <ScrollableList.item
      primary={primary}
      secondary={secondaryText}
      action={<FirebaseConsoleLink firebasePath={getFirebasePath(hit)} />}
      starEnabled={!hasEngagements}
      withStar
      {...rest}
    />
  );
};

ConvertExternalUserTaskItem.propTypes = {
  hit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    engagements: PropTypes.shape({}),
    externalUser: PropTypes.shape({
      email: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string,
      }).isRequired,
    }),
  }).isRequired,
  style: PropTypes.shape({}),
};

ConvertExternalUserTaskItem.defaultProps = {
  style: null,
};

const engagementsCountSelector = createSelector(
  propSelector(['hit', 'engagements']),
  R.compose(
    R.length,
    R.values,
    R.defaultTo({}),
  ),
);

export default withProps(
  createStructuredSelector({
    engagementsCount: engagementsCountSelector,
  }),
)(ConvertExternalUserTaskItem);
