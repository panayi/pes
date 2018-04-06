import React from 'react';
import { withProps } from 'recompose';
import Spinner from '../../components/Spinner/Spinner';

const withSpinnerWhen = (predicate, spinnerProps = {}) => {
  const spinner = <Spinner {...spinnerProps} />;

  return withProps(props => ({
    spinner: predicate(props) ? spinner : null,
  }));
};

export default withSpinnerWhen;
