import React from 'react';
import MessageIcon from 'material-ui-icons/Message';
import EmptyHero from 'components/EmptyHero/EmptyHero';

const NoConversationSelected = () => (
  <EmptyHero
    icon={MessageIcon}
    tagline="Select a conversation to start chatting"
  />
);

export default NoConversationSelected;
