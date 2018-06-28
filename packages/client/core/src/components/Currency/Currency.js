import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as siteSelectors } from '../../store/site';
import { selectors as userInfoSelectors } from '../../store/userInfo';

const Currency = ({ value, language, currency, noDecimalsProps }) =>
  value.toLocaleString(language, {
    style: 'currency',
    currency,
    ...noDecimalsProps,
  });

const noDecimalsPropsSelector = createSelector(
  propSelector('noDecimals'),
  R.ifElse(
    R.identity,
    R.always({ minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    R.always({}),
  ),
);

const mapStateToProps = createStructuredSelector({
  language: userInfoSelectors.languageSelector,
  currency: siteSelectors.currencySelector,
  noDecimalsProps: noDecimalsPropsSelector,
});

export default connect(mapStateToProps)(Currency);
