import React from 'react';
import { Heading } from 'rebass';
import Page from '../../lib/components/Page';
import needsAdmin from '../../auth/visibility/needsAdminHoc';
import Sync from '../../admin/Sync';

const Admin = () => (
  <Page>
    <div>
      <Heading>
        Sync
      </Heading>
      <Sync />
    </div>
  </Page>
);

export default needsAdmin()(Admin);
