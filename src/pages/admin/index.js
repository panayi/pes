import React from 'react';
import R from 'ramda';
import { Box, PanelHeader, Button, Column } from 'rebass';
import { connect } from 'react-redux';
import Page from '../../lib/components/Page';
import needsAdmin from '../../auth/visibility/needsAdminHoc';
import Sync from '../../admin/Sync';
import { actions } from '../../admin/admin';

const Admin = ({ seed, bootstrapAlgolia }) => (
  <Page widths={['50%', '50%']}>
    <Box>
      <PanelHeader mb={3}>
        Bootstrap
      </PanelHeader>
      <Column>
        <Button onClick={seed}>
          Seed
        </Button>
      </Column>
      <Column>
        <Button onClick={bootstrapAlgolia}>
          Import Algolia data
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
  seed: actions.seed,
  bootstrapAlgolia: actions.bootstrapAlgolia,
};

export default R.compose(
  needsAdmin(),
  connect(null, mapDispatchToProps),
)(Admin);
