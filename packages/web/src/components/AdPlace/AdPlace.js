import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as siteSelectors } from 'store/site';
import renderNothingWhen from 'hocs/renderNothingWhen';

const AdPlace = ({ place, render, children }) =>
  (children || render)({ place });

const adPlaceSelector = createSelector(
  propSelector(['ad', 'location', 'address', 'city']),
  propSelector(['ad', 'location', 'address', 'country']),
  siteSelectors.countryNameSelector,
  siteSelectors.countryCodeSelector,
  (adCity, adCountryCode, siteCountryName, siteCountryCode) => {
    if (adCity) {
      return adCity;
    }

    // This should never happen but test it anyway
    if (adCountryCode !== siteCountryCode) {
      return adCountryCode;
    }

    return siteCountryName;
  },
);

const mapStateToProps = createStructuredSelector({
  place: adPlaceSelector,
});

export default R.compose(
  connect(mapStateToProps),
  renderNothingWhen(R.propSatisfies(isNilOrEmpty, 'place')),
)(AdPlace);
