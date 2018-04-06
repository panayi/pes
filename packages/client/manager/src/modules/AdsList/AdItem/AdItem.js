import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import withStyles from '@material-ui/core/styles/withStyles';
import { red, orange } from '@material-ui/core/colors';
import HighlightMatch from 'components/HighlightMatch';
import ScrollableList from 'components/ScrollableList';
import FirebaseConsoleLink from 'components/FirebaseConsoleLink/FirebaseConsoleLink';

const getSecondaryText = hit => hit.body;

const styles = {
  deleted: {
    '&:before': {
      content: '" "',
      border: [5, 'solid', orange[200]],
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
    },
  },
  rejected: {
    '&:before': {
      content: '" "',
      border: [5, 'solid', red[200]],
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
    },
  },
};

const AdItem = props => {
  const { hit, image, getFirebasePath, classes, ...rest } = props;
  const { matches = [] } = hit;
  const title = R.path(['hit', 'title'], props);
  const titleMatches = matches.title;

  const primary = titleMatches ? (
    <HighlightMatch matches={titleMatches} text={title} />
  ) : (
    title
  );

  return (
    <ScrollableList.item
      className={classes[hit.status]}
      primary={primary}
      secondary={titleMatches ? null : getSecondaryText(hit)}
      image={image}
      action={<FirebaseConsoleLink firebasePath={getFirebasePath(hit)} />}
      {...rest}
    />
  );
};

AdItem.propTypes = {
  hit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    props: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
    matches: PropTypes.shape({}),
  }).isRequired,
  style: PropTypes.shape({}),
};

AdItem.defaultProps = {
  style: null,
};

const imageSelector = createCachedSelector(
  propSelector(['hit', 'images']),
  R.compose(R.head, R.values, R.defaultTo({})),
)(propSelector(['hit', 'id']));

export default R.compose(
  withProps(
    createStructuredSelector({
      image: imageSelector,
    }),
  ),
  withStyles(styles),
)(AdItem);
