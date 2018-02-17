import * as R from 'ramda';
import { createSelector } from 'reselect';
import { selectors as authSelectors } from 'store/firebase/auth';

export const createIsBuyerSelector = buyerSelector =>
  createSelector(buyerSelector, authSelectors.uidSelector, R.equals);

export const createOtherUserIdSelector = (buyerSelector, sellerSelector) =>
  createSelector(
    createIsBuyerSelector(buyerSelector),
    sellerSelector,
    buyerSelector,
    (isBuyer, seller, buyer) => (isBuyer ? seller : buyer),
  );
