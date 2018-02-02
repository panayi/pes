import * as R from 'ramda';
import { branch, renderComponent, withProps } from 'recompose';
import Spinner from 'components/atoms/Spinner';

export default (predicate, spinnerProps) =>
  branch(
    predicate,
    R.compose(renderComponent, withProps(spinnerProps))(Spinner),
  );
