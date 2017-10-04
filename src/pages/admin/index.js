import React from 'react';
import R from 'ramda';
import { Box, PanelHeader, Button, Column } from 'rebass';
import { connect } from 'react-redux';
import Page from '../../lib/components/Page';
import needsAdmin from '../../auth/visibility/needsAdminHoc';
import Sync from '../../admin/Sync';
import { actions } from '../../admin/admin';

const Admin = ({ initializeFirebaseDb, initializeAlgolia }) => (
  <Page widths={['50%', '50%']}>
    <Box>
      <PanelHeader mb={3}>
        Initialize
      </PanelHeader>
      <Column>
        <Button onClick={initializeFirebaseDb}>
          Initialize Firebase Database
        </Button>
      </Column>
      <Column>
        <Button onClick={initializeAlgolia}>
          Initialize Algolia
        </Button>
      </Column>
    </Box>
    <Box>
      <PanelHeader mb={3}>
        Sync
      </PanelHeader>
      <Sync />
    </Box>
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
