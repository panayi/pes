import R from 'ramda';
import { firebaseConnect } from 'react-redux-firebase';
import { withProps } from 'recompose';
import Form from '../Form';

export default R.compose(
  firebaseConnect([
    'props',
  ]),
  withProps(({ firebase }) => ({
    onSubmit: (post) => {
      firebase.push('/posts', post);
    },
  })),
)(Form);
