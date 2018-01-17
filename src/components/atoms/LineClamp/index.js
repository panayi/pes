/* @flow */
import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui';

const styles = {
  root: {
    display: '-webkit-box',
    fallbacks: [{ display: 'block' }],
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
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

export default withStyles(styles)(LineClamp);
