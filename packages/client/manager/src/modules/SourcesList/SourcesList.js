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
import SourceItem from './SourceItem/SourceItem';

const FILTER_COLLECTION_ID = 'sources';

const getFirebasePath = hit => `/${modelPaths.SOURCES.string}/${hit.id}`;

const SourcesList = props => {
  const { basePath, selected, disableNavigation, sources, isLoading } = props;

  return (
    <FilterCollection id={FILTER_COLLECTION_ID}>
      <ScrollableList
        header={
          <React.Fragment>
            <CreateButton to={`${basePath}/create`} />
            <FilterCollection.Search placeholder="Find sources" />
          </React.Fragment>
        }
        isLoading={isLoading}
      >
        <FilterCollection.Hits
          searchableAttributes={['name']}
          collection={sources}
          hitComponent={SourceItem}
          basePath={basePath}
          selected={selected}
          disableNavigation={disableNavigation}
          hitProps={{ getFirebasePath }}
        />
      </ScrollableList>
    </FilterCollection>
  );
};

SourcesList.propTypes = {
  basePath: PropTypes.string.isRequired,
  selected: PropTypes.string,
  sources: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
};

SourcesList.defaultProps = {
  selected: null,
  sources: [],
};

const mapDataToProps = {
  sources: models.sources.all,
};

export default R.compose(
  connectData(mapDataToProps),
  withProps(
    createStructuredSelector({
      isLoading: R.complement(propSelector(['isLoaded', 'sources'])),
    }),
  ),
)(SourcesList);
