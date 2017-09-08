import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { defaultProps } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { categoriesSelector } from './categories';

const mapStateToProps = createStructuredSelector({
  categories: categoriesSelector,
});

export default R.compose(
  defaultProps({
    categories: [],
  }),
  firebaseConnect([
    'categories',
  ]),
  connect(mapStateToProps),
);
