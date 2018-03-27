import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
  root: {
    display: '-webkit-box',
    fallbacks: [{ display: 'block' }],
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

const LineClamp = ({
  lines,
  height,
  children,
  tagName: Tag,
  className,
  classes,
}) => (
  <Tag
    className={classNames(className, classes.root)}
    style={{ WebkitLineClamp: lines, maxHeight: `${height}px` }}
  >
    {children}
  </Tag>
);

LineClamp.propTypes = {
  lines: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
  tagName: elementType,
  className: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
};

LineClamp.defaultProps = {
  children: null,
  tagName: 'div',
  className: null,
};

export default withStyles(styles)(LineClamp);
