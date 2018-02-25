import React, { Children } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import Badge from 'material-ui/Badge';
import { propSelector } from 'pesposa-utils';
import { selectors as chatSelectors } from 'store/chat';
import withConversations from '../withConversations/withConversations';

const UnreadConversationsBadge = ({
  unreadCount,
  color,
  withNumber,
  classes,
  children,
}) =>
  unreadCount > 0 ? (
    <Badge
      badgeContent={withNumber ? unreadCount : null}
      color={color}
      classes={classes}
    >
      {children}
    </Badge>
  ) : (
    Children.only(children)
  );

UnreadConversationsBadge.propTypes = {
  unreadCount: PropTypes.number.isRequired,
  withNumber: PropTypes.bool,
  color: PropTypes.string,
  classes: PropTypes.shape({}),
  children: PropTypes.element.isRequired,
};

UnreadConversationsBadge.defaultProps = {
  withNumber: true,
  color: 'default',
  classes: {},
};

const mapStateToProps = createStructuredSelector({
  activeConversation: chatSelectors.activeConversationSelector,
});

export default R.compose(
  connect(mapStateToProps),
  withConversations,
  withProps(
    createStructuredSelector({
      unreadCount: createSelector(
        propSelector('activeConversation'),
        propSelector('conversations'),
        (activeConversation, conversations) =>
          R.compose(
            R.length,
            R.reject(
              R.either(R.prop('read'), R.propEq('id', activeConversation)),
            ),
            R.defaultTo([]),
          )(conversations),
      ),
    }),
  ),
)(UnreadConversationsBadge);
