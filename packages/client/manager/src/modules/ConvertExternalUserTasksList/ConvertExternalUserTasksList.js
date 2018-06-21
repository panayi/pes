import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import FilterCollection from 'components/FilterCollection';
import ScrollableList from 'components/ScrollableList';
import ConvertExternalUserTaskItem from './ConvertExternalUserTaskItem/ConvertExternalUserTaskItem';

const FILTER_COLLECTION_ID = 'convertExternalUserTasks';

const getFirebasePath = task =>
  `/${modelPaths.CONVERT_EXTERNAL_USER_TASKS.string}/${task.id}`;

const ConvertExternalUserTasksList = props => {
  const { basePath, selected, tasks, isLoading } = props;

  return (
    <FilterCollection id={FILTER_COLLECTION_ID}>
      <ScrollableList
        header={<FilterCollection.Search placeholder="Find ExternalUsers" />}
        isLoading={isLoading}
      >
        <FilterCollection.Hits
          searchableAttributes={[
            ['externalUser', 'profile', 'name'],
            ['externalUser', 'email'],
            ['externalUser', 'profile', 'phone'],
          ]}
          collection={tasks}
          hitComponent={ConvertExternalUserTaskItem}
          basePath={basePath}
          selected={selected}
          hitProps={{ getFirebasePath }}
        />
      </ScrollableList>
    </FilterCollection>
  );
};

ConvertExternalUserTasksList.propTypes = {
  basePath: PropTypes.string.isRequired,
  selected: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
};

ConvertExternalUserTasksList.defaultProps = {
  selected: null,
  tasks: [],
};

export default R.compose(
  withProps(
    createStructuredSelector({
      isLoading: R.complement(propSelector(['isLoaded', 'tasks'])),
    }),
  ),
)(ConvertExternalUserTasksList);
