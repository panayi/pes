import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import { models } from 'store/firebase/data';
import * as constants from './constants';

export const activeConversationSelector = R.path(constants.ROOT_PATH);

export const unreadConversationsSelector = createSelector(
  R.compose(R.defaultTo([]), models.conversations.all.selector),
  activeConversationSelector,
  (conversations, activeConversationId) =>
    R.compose(
      R.length,
      R.filter(
        R.allPass([
          R.complement(R.propEq('id', activeConversationId)),
          ({ lastMessageReceivedAt, lastActiveAt }) =>
            !isNilOrEmpty(lastMessageReceivedAt) &&
            (isNilOrEmpty(lastActiveAt) ||
              lastMessageReceivedAt > lastActiveAt),
        ]),
      ),
    )(conversations),
);
