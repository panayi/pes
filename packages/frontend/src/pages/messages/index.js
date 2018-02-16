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
        path="/messages/:ad/:buyer"
        render={({ match }) => (
          <Messenger ad={match.params.ad} buyer={match.params.buyer} />
        )}
      />
    </Switch>
  </Layout>
);

export default Messages;
