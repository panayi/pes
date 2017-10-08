import React from 'react';
import * as R from 'ramda';
import { Button } from 'material-ui';
import { connect } from 'react-redux';
import Page from '../../lib/components/Page';
import needsAdmin from '../../auth/visibility/needsAdmin';
import Sync from '../../admin/Sync';
import { actions } from '../../admin/admin';

const Admin = ({ initializeFirebaseDb, initializeAlgolia }) => (
  <Page widths={['50%', '50%']}>
    <Button onClick={initializeFirebaseDb}>
      Initialize Firebase Database
    </Button>
    <Button onClick={initializeAlgolia}>
      Initialize Algolia
    </Button>
    <Sync />
  </Page>
);

const mapDispatchToProps = {
  initializeFirebaseDb: actions.initializeFirebaseDb,
  initializeAlgolia: actions.initializeAlgolia,
};

export default R.compose(
  needsAdmin(),
  connect(null, mapDispatchToProps),
)(Admin);
