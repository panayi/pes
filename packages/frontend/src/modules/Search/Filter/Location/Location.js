import { createStructuredSelector } from 'reselect';
import {
  selectors as locationSelectors,
  actions as locationActions,
} from 'store/search/location';
import connectSearch from 'hocs/connectSearch';
import SearchLocation from 'components/SearchLocation/SearchLocation';

const mapStateToProps = createStructuredSelector({
  address: locationSelectors.addressSelector,
});

const mapDispatchToProps = {
  onChange: locationActions.setLocation,
};

export default connectSearch(mapStateToProps, mapDispatchToProps)(
  SearchLocation,
);