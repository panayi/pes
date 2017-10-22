import React from 'react';
import * as R from 'ramda';
import { Button } from 'material-ui';
import { connect } from 'react-redux';
import Layout from 'components/organisms/Layout';
import Page from 'components/organisms/Page';
import needsAdmin from 'components/hocs/needsAdmin';
import Sync from 'components/smarts/Sync';
import { actions } from 'store/admin';

const Admin = ({ initializeFirebaseDb, initializeAlgolia }) => (
  <Layout>
    <Page>
      <Button
        color="primary"
        raised
        onClick={initializeFirebaseDb}
      >
        Initialize Firebase Database
      </Button>
      <Button
        color="primary"
        raised
        onClick={initializeAlgolia}
      >
        Initialize Algolia
      </Button>
      <Sync />
    </Page>
  </Layout>
);

const mapDispatchToProps = {
  initializeFirebaseDb: actions.initializeFirebaseDb,
  initializeAlgolia: actions.initializeAlgolia,
};

export default R.compose(
  needsAdmin(),
  connect(null, mapDispatchToProps),
)(Admin);
