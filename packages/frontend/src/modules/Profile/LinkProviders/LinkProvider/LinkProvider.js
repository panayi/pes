import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  clickable: {
    cursor: 'pointer',
  },
};

const LinkProvider = props => {
  const {
    component: Provider,
    providerId,
    linkedProviders,
    onClick,
    classes,
  } = props;
  const isLinked = R.contains(providerId, linkedProviders);
  const disabled = !isLinked;
  const className = classNames({ [classes.clickable]: disabled });

  return (
    <Provider
      providerId={providerId}
      disabled={disabled}
      className={className}
      onClick={isLinked ? null : onClick}
    />
  );
};

export default withStyles(styles)(LinkProvider);
