import * as R from 'ramda';
import PropTypes from 'prop-types';
import { getContext, renameProp } from 'recompose';

const withFilterCollectionId = BaseComponent =>
  R.compose(
    getContext({
      filterCollectionId: PropTypes.string.isRequired,
    }),
    renameProp('filterCollectionId', 'id'),
  )(BaseComponent);

export default withFilterCollectionId;
