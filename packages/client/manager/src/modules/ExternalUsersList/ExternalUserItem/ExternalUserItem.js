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

const getSecondaryText = ({ email, phone }, matches) => {
  const emailMatches = matches.email;
  const phoneMatches = matches.phone;

  if (email && phone) {
    return (
      <React.Fragment>
        <HighlightMatch matches={emailMatches} text={email} />
        <br />
        <HighlightMatch matches={phoneMatches} text={phone} />
      </React.Fragment>
    );
  }

  if (email) {
    return <HighlightMatch matches={emailMatches} text={email} />;
  }

  return <HighlightMatch matches={phoneMatches} text={phone} />;
};

const ExternalUserItem = props => {
  const { hit, image, getFirebasePath, ...rest } = props;
  const { matches = [] } = hit;
  const name = R.path(['profile', 'name'], hit);
  const nameMatches = matches.profile && matches.profile.name;
  const primary = nameMatches ? (
    <HighlightMatch matches={nameMatches} text={name} />
  ) : (
    name
  );

  return (
    <ScrollableList.item
      primary={primary}
      secondary={getSecondaryText(hit, matches)}
      image={image}
      action={<FirebaseConsoleLink firebasePath={getFirebasePath(hit)} />}
      {...rest}
    />
  );
};

ExternalUserItem.propTypes = {
  hit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string,
    }).isRequired,
    email: PropTypes.string,
    url: PropTypes.string,
    matches: PropTypes.shape({}),
  }).isRequired,
  style: PropTypes.shape({}),
};

ExternalUserItem.defaultProps = {
  style: null,
};

const imageSelector = createCachedSelector(
  propSelector(['hit', 'avatar']),
  R.compose(R.head, R.values, R.defaultTo({})),
)(propSelector(['hit', 'id']));

export default withProps(
  createStructuredSelector({
    image: imageSelector,
  }),
)(ExternalUserItem);
