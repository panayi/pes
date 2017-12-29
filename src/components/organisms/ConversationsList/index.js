import React from 'react';
import * as R from 'ramda';
import { connectData } from 'lib/connectData';
import { models } from 'store/data';

const ConversationsList = props => (
    <div>
      {R.map(conversation => <div>{conversation.ad}</div>, props.conversations)}
    </div>
  );

ConversationsList.propTypes = {};

const mapDataToProps = {
  conversations: models.conversations.all,
};

export default connectData(mapDataToProps)(ConversationsList);
