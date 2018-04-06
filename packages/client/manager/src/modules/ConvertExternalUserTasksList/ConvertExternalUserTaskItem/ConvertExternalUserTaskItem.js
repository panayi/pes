import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import HighlightMatch from 'components/HighlightMatch';
import ScrollableList from 'components/ScrollableList';
import FirebaseConsoleLink from 'components/FirebaseConsoleLink/FirebaseConsoleLink';

const namePath = ['externalUser', 'profile', 'name'];

const ConvertExternalUserTaskItem = props => {
  const { hit, getFirebasePath, ...rest } = props;
  const { engagements, matches = [] } = hit;
  const name = R.path(namePath, hit);
  const nameMatches = R.path(namePath, matches);
  const primary = nameMatches ? (
    <HighlightMatch matches={nameMatches} text={name} />
  ) : (
    name
  );
  const engagementsCount = R.compose(R.length, R.defaultTo([]))(engagements);
  const secondaryText =
    engagementsCount > 0 ? `${engagementsCount} engagements` : 'No engagements';

  return (
    <ScrollableList.item
      primary={primary}
      secondary={secondaryText}
      action={<FirebaseConsoleLink firebasePath={getFirebasePath(hit)} />}
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

export default ConvertExternalUserTaskItem;
