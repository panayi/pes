/* @flow */
import R from 'ramda';
import { firebaseConnect } from 'react-redux-firebase';
import { withProps, defaultProps } from 'recompose';
import Form from '../Form';
import noop from '../../lib/helpers/noop';

type Props = {
  firebase: Object,
  onCreate: Function,
};

export default R.compose(
  firebaseConnect([
    'props',
  ]),
  defaultProps({
    onCreate: noop,
  }),
  withProps(({ firebase, onCreate }: Props) => ({
    onSubmit: (post) => {
      firebase
        .push('/posts', post)
        .then(onCreate);
    },
  })),
)(Form);
