import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import FilterCollection from 'components/FilterCollection';
import ScrollableList from 'components/ScrollableList';
import SubmissionTaskItem from './SubmissionTaskItem/SubmissionTaskItem';

const FILTER_COLLECTION_ID = 'submissionTasks';

const getFirebasePath = submissionTask =>
  `/${modelPaths.SUBMISSION_TASKS.string}/${submissionTask.id}`;

const SubmissionTasksList = props => {
  const { basePath, selected, submissionTasks, isLoading } = props;

  return (
    <FilterCollection id={FILTER_COLLECTION_ID}>
      <ScrollableList
        header={<FilterCollection.Search placeholder="Find submissions" />}
        isLoading={isLoading}
      >
        <FilterCollection.Hits
          searchableAttributes={['title', 'body']}
          collection={submissionTasks}
          hitComponent={SubmissionTaskItem}
          basePath={basePath}
          selected={selected}
          hitProps={{ getFirebasePath }}
        />
      </ScrollableList>
    </FilterCollection>
  );
};

SubmissionTasksList.propTypes = {
  basePath: PropTypes.string.isRequired,
  selected: PropTypes.string,
  submissionTasks: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
};

SubmissionTasksList.defaultProps = {
  submissionTasks: [],
  selected: null,
};

export default R.compose(
  withProps(
    createStructuredSelector({
      isLoading: R.complement(propSelector(['isLoaded', 'submissionTasks'])),
    }),
  ),
)(SubmissionTasksList);
