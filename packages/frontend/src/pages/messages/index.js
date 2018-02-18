import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from 'layouts/Layout/Layout';
import Messenger from 'modules/Messenger/Messenger';
import Header from 'pages/components/Header/Header';

const Messages = () => (
  <Layout header={Header} fixed flex wide>
    <Switch>
      <Route exact path="/messages" component={Messenger} />
      <Route
        path="/messages/:conversationId"
        render={({ match }) => (
          <Messenger conversationId={match.params.conversationId} />
        )}
      />
    </Switch>
  </Layout>
);

export default Messages;
