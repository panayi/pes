import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Badge from 'material-ui/Badge';
import { selectors as chatSelectors } from 'store/chat';

const UnreadConversationsBadge = ({
  unreadCount,
  color,
  withNumber,
  classes,
  children,
}) =>
  unreadCount > 0 ? (
    <Badge
      badgeContent={withNumber ? unreadCount : ''}
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
  unreadCount: chatSelectors.unreadConversationsSelector,
});

export default connect(mapStateToProps)(UnreadConversationsBadge);
