import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectors as profileSelectors } from 'store/firebase/profile';

const Currency = ({ value, locale, currency }) => value.toLocaleString(locale, { style: 'currency', currency });

const mapStateToProps = createStructuredSelector({
  locale: profileSelectors.profileLocaleSelector,
  currency: R.compose(
    R.defaultTo('EUR'), // TODO: extract to core/config constant
    R.prop('currency'),
    profileSelectors.profileCountrySelector,
  ),
});

export default connect(mapStateToProps)(Currency);
