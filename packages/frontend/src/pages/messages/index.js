import React from 'react';
import Layout from 'layouts/Layout/Layout';
import Messenger from 'modules/Messenger/Messenger';

const Messages = ({ match }) => (
  <Layout fixed flex wide>
    <Messenger ad={match.params.ad} buyer={match.params.buyer} />
  </Layout>
);

export default Messages;
