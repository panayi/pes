import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import HighlightMatch from 'components/HighlightMatch';
import ScrollableList from 'components/ScrollableList';
import FirebaseConsoleLink from 'components/FirebaseConsoleLink/FirebaseConsoleLink';

const SubmissionTaskItem = props => {
  const { hit, submitterAvatar, getFirebasePath, ...rest } = props;
  const { matches = [] } = hit;
  const submission = R.propOr({}, 'submission', hit);
  const { title, body } = submission;
  const titleMatches = matches.title;
  const primary = titleMatches ? (
    <HighlightMatch matches={titleMatches} text={title} />
  ) : (
    title
  );

  return (
    <ScrollableList.item
      primary={primary}
      secondary={body}
      image={submitterAvatar}
      action={<FirebaseConsoleLink firebasePath={getFirebasePath(hit)} />}
      {...rest}
    />
  );
};

SubmissionTaskItem.propTypes = {
  hit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    submission: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  }).isRequired,
  style: PropTypes.shape({}),
};

SubmissionTaskItem.defaultProps = {
  style: null,
};

const mapDataToProps = {
  submitterAvatar: models.users
    .one(propSelector(['hit', 'submission', 'submitter']))
    .child('avatar'),
};

export default connectData(mapDataToProps)(SubmissionTaskItem);
