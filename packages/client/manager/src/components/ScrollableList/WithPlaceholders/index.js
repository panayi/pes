import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import ScrollableListItem from '../ScrollableListItem';

const WithPlaceholders = ({ when, howMany, children }) =>
  when
    ? R.compose(
        R.map(index => (
          <div key={index}>
            <ScrollableListItem placeholder />
          </div>
        )),
        R.range(0),
      )(howMany)
    : children;

WithPlaceholders.propTypes = {
  when: PropTypes.bool,
  placeholder: PropTypes.node,
  howMany: PropTypes.number.isRequired,
  children: PropTypes.node,
};

WithPlaceholders.defaultProps = {
  when: false,
};

export default WithPlaceholders;
