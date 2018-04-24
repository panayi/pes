import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectors as userInfoSelectors } from 'store/userInfo';

const Currency = ({ value, language, currency }) =>
  value.toLocaleString(language, { style: 'currency', currency });

const mapStateToProps = createStructuredSelector({
  language: userInfoSelectors.languageSelector,
  currency: userInfoSelectors.currencySelector,
});

export default connect(mapStateToProps)(Currency);
