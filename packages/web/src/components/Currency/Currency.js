import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectors as userInfoSelectors } from 'store/userInfo';

const Currency = ({ value, language, currency }) =>
  value.toLocaleString(language, { style: 'currency', currency });

const mapStateToProps = createStructuredSelector({
  language: userInfoSelectors.languageSelector,
  currency: R.compose(
    R.defaultTo('EUR'), // TODO: extract to core/config constant
    R.prop('currency'),
    userInfoSelectors.countrySelector,
  ),
});

export default connect(mapStateToProps)(Currency);
