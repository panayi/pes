import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import Layout from 'layouts/Layout/Layout';
import Messenger from 'modules/Messenger/Messenger';
import Header from 'pages/components/Header/Header';

const Messages = () => {
  const content = (
    <Switch>
      <Route exact path="/messages" component={Messenger} />
      <Route
        path="/messages/:conversationId"
        render={({ match }) => (
          <Messenger conversationId={match.params.conversationId} />
        )}
      />
    </Switch>
  );
  return (
    <React.Fragment>
      <DesktopScreen>
        <Layout header={Header} fixed flex wide>
          {content}
        </Layout>
      </DesktopScreen>
      <MobileScreen>
        <Layout header={Header}>{content}</Layout>
      </MobileScreen>
    </React.Fragment>
  );
};

export default Messages;
