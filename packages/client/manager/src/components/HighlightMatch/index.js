import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

const styles = {
  highlight: {
    fontWeight: 'bold',
  },
};

const HighlightMatch = ({ text, query, matches, classes }) => {
  const finalMatches = matches || match(text, query);
  const items = parse(text, finalMatches);

  return items.map(item => (
    <span
      key={item.text}
      className={classNames({ [classes.highlight]: item.highlight })}
    >
      {item.text}
    </span>
  ));
};

HighlightMatch.propTypes = {
  text: PropTypes.string,
  query: PropTypes.string,
  matches: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  classes: PropTypes.shape({}).isRequired,
};

HighlightMatch.defaultProps = {
  text: '',
  query: '',
  matches: null,
};

export default withStyles(styles)(HighlightMatch);
