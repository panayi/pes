import * as R from 'ramda';
import { createSelector } from 'reselect';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';

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

export const createOtherUserTypeSelector = (buyerSelector, adSelector) =>
  createSelector(
    createIsBuyerSelector(buyerSelector),
    R.compose(R.defaultTo({}), adSelector),
    (isBuyer, ad) => (isBuyer ? ad.sellerType : sellerTypes.USER),
  );
