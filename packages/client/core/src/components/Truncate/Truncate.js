import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { branch, withState, withProps } from 'recompose';
import ReactTruncate from 'react-truncate';
import A from '../A/A';

const Truncate = ({
  lines,
  ellipsis,
  showMoreText,
  setExpanded,
  children,
  className,
  classes,
}) => {
  const finalEllipsis = showMoreText ? (
    <React.Fragment>
      {ellipsis}
      <A className={classes.readMore} onClick={() => setExpanded(true)}>
        {showMoreText}
      </A>
    </React.Fragment>
  ) : (
    ellipsis
  );

  return (
    <ReactTruncate className={className} lines={lines} ellipsis={finalEllipsis}>
      {children}
    </ReactTruncate>
  );
};

Truncate.propTypes = {
  lines: PropTypes.number.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.shape({
    readMore: PropTypes.string,
  }),
};

Truncate.defaultProps = {
  children: null,
  className: null,
  classes: {},
};

export default branch(
  propSelector('showMoreText'),
  R.compose(
    withState('expanded', 'setExpanded', false),
    withProps(({ lines, expanded }) => ({
      lines: expanded ? null : lines,
    })),
  ),
)(Truncate);
