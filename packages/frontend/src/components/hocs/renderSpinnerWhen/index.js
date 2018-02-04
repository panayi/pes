import * as R from 'ramda';
import { branch, renderComponent, withProps } from 'recompose';
import Spinner from 'components/atoms/Spinner';

const renderSpinnerWhen = (predicate, spinnerProps) =>
  branch(
    predicate,
    R.compose(renderComponent, withProps(spinnerProps))(Spinner),
  );

export default renderSpinnerWhen;
