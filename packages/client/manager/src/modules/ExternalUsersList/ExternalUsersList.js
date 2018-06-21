import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import FilterCollection from 'components/FilterCollection';
import ScrollableList from 'components/ScrollableList';
import CreateButton from 'components/CreateButton/CreateButton';
import ExternalUserItem from './ExternalUserItem/ExternalUserItem';

const FILTER_COLLECTION_ID = 'externalUsers';

const getFirebasePath = hit => `/${modelPaths.EXTERNAL_USERS.string}/${hit.id}`;

const ExternalUsersList = props => {
  const { basePath, selected, externalUsers, isLoading } = props;

  return (
    <FilterCollection id={FILTER_COLLECTION_ID}>
      <ScrollableList
        header={
          <React.Fragment>
            <CreateButton to="/data/external-users/create" />
            <FilterCollection.Search placeholder="Find externalUsers" />
          </React.Fragment>
        }
        isLoading={isLoading}
      >
        <FilterCollection.Hits
          searchableAttributes={[
            ['profile', 'name'],
            ['profile', 'phone'],
            'email',
          ]}
          collection={externalUsers}
          hitComponent={ExternalUserItem}
          basePath={basePath}
          selected={selected}
          hitProps={{ getFirebasePath }}
        />
      </ScrollableList>
    </FilterCollection>
  );
};

ExternalUsersList.propTypes = {
  basePath: PropTypes.string.isRequired,
  selected: PropTypes.string,
  externalUsers: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
};

ExternalUsersList.defaultProps = {
  selected: null,
  externalUsers: [],
};

const mapDataToProps = {
  externalUsers: models.externalUsers.all,
};

export default R.compose(
  connectData(mapDataToProps),
  withProps(
    createStructuredSelector({
      isLoading: R.complement(propSelector(['isLoaded', 'externalUsers'])),
    }),
  ),
)(ExternalUsersList);
