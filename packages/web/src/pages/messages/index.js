import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import { Helmet } from 'react-helmet';
import getMetaTags from 'utils/getMetaTags';
import Layout from 'layouts/Layout/Layout';
import Messenger from 'modules/Messenger/Messenger';
import Header from 'pages/components/Header/Header';

const Messages = ({ location }) => {
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
      <Helmet
        {...getMetaTags({
          title: `Messages - Pesposa`,
          path: location.pathname,
        })}
      />
      <DesktopScreen component={React.Fragment}>
        <Layout header={Header} fixed flex wide>
          {content}
        </Layout>
      </DesktopScreen>
      <MobileScreen component={React.Fragment}>
        <Layout header={Header}>{content}</Layout>
      </MobileScreen>
    </React.Fragment>
  );
};

export default Messages;
