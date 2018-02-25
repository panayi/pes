import * as R from 'ramda';
import { createSelector } from 'reselect';
import { selectors as authSelectors } from 'store/firebase/auth';

export const createIsBuyerSelector = buyerSelector =>
  createSelector(buyerSelector, authSelectors.uidSelector, R.equals);

export const createOtherUserIdSelector = ({
  buyerIdSelector,
  sellerIdSelector,
}) =>
  createSelector(
    createIsBuyerSelector(buyerIdSelector),
    sellerIdSelector,
    buyerIdSelector,
    (isBuyer, sellerId, buyerId) => (isBuyer ? sellerId : buyerId),
  );
