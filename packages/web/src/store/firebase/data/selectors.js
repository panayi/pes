import { createSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as authSelectors } from 'store/firebase/auth';

export const isSellerSelector = createSelector(
  propSelector(['ad', 'user']),
  propSelector(['uid']),
  authSelectors.uidSelector,
  (sellerId, currentUserIdFromProps, currentUserIdFromState) => {
    const currentUserId = currentUserIdFromProps || currentUserIdFromState;

    return sellerId && currentUserId && sellerId === currentUserId;
  },
);
