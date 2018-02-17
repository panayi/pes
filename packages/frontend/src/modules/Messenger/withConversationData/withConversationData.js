import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { selectors as authSelectors } from 'store/firebase/auth';
import hydrateAd from 'hocs/hydrateAd';

const mapStateToProps = createStructuredSelector({
  uid: authSelectors.uidSelector,
});

const createIsBuyerSelector = buyerSelector =>
  createSelector(buyerSelector, R.prop('uid'), R.equals);

const selector = buyerSelector => {
  const isBuyerSelector = createIsBuyerSelector(buyerSelector);
  return props => ({
    isBuyer: isBuyerSelector(props),
    otherUserId: R.ifElse(
      isBuyerSelector,
      R.path(['ad', 'user']),
      buyerSelector,
    )(props),
  });
};

const withConversationData = ({ adSelector, buyerSelector }) =>
  R.compose(
    hydrateAd(adSelector),
    connect(mapStateToProps),
    withProps(selector(buyerSelector)),
  );

export default withConversationData;
