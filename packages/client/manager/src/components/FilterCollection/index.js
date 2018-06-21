import PropTypes from 'prop-types';
import { withContext } from 'recompose';
import Hits from './Hits';
import Search from './Search';

const FilterCollection = withContext(
  {
    filterCollectionId: PropTypes.string.isRequired,
  },
  ({ id }) => ({
    filterCollectionId: id,
  }),
)(({ children }) => children);

FilterCollection.Hits = Hits;
FilterCollection.Search = Search;

export default FilterCollection;
