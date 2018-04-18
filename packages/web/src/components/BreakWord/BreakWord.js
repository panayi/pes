import React from 'react';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';

// Source: https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/
export const breakWordCss = {
  /* These are technically the same, but use both */
  overflowWrap: 'break-word',
  wordWrap: 'break-word',

  '-ms-word-break': 'break-all',
  wordBreak: 'break-word',
};

const theme = {
  root: breakWordCss,
};

const BreakWord = ({ component: Komponent, className, classes, ...rest }) => (
  <Komponent className={classNames(classes.root, className)} {...rest} />
);

BreakWord.defaultProps = {
  component: 'div',
};

export default withStyles(theme)(BreakWord);
