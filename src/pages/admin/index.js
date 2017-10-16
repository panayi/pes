import React from 'react';
import * as R from 'ramda';
import { Button } from 'material-ui';
import { connect } from 'react-redux';
import Layout from '../layout';
import Content from '../../lib/components/Content';
import needsAdmin from '../../auth/visibility/needsAdmin';
import Sync from '../../admin/Sync';
import { actions } from '../../admin/admin';

const Admin = ({ initializeFirebaseDb, initializeAlgolia }) => (
  <Layout>
    <Content>
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
    </Content>
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
