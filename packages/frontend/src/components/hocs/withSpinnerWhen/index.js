import React from 'react';
import { withProps } from 'recompose';
import Spinner from 'components/atoms/Spinner';

export default (predicate, spinnerProps = {}) => {
  const spinner = <Spinner {...spinnerProps} />;

  return withProps(props => ({
    spinner: predicate(props) ? spinner : null,
  }));
};
