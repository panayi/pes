import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectors as locationSelectors,
  actions as locationActions,
} from 'store/search/location';
import SearchLocation from 'components/atoms/SearchLocation';

const mapStateToProps = createStructuredSelector({
  address: locationSelectors.addressSelector,
});

const mapDispatchToProps = {
  onChange: locationActions.setLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);
