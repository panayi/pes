import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectors as filterAdsSelectors,
  actions as filterAdsActions,
} from 'store/filterAds';
import SearchLocation from 'components/atoms/SearchLocation';

const mapStateToProps = createStructuredSelector({
  address: filterAdsSelectors.addressSelector,
});

const mapDispatchToProps = {
  onChange: filterAdsActions.setLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);
