import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { deserializeAdSelector } from '@pesposa/core/src/selectors/ads';
import FilterCollection from 'components/FilterCollection';
import ScrollableList from 'components/ScrollableList';
import AdItem from './AdItem/AdItem';

const AdsList = props => {
  const {
    id,
    basePath,
    selected,
    ads,
    getFirebasePath,
    isLoading,
    searchPlaceholder,
  } = props;

  return (
    <FilterCollection id={id}>
      <ScrollableList
        header={<FilterCollection.Search placeholder={searchPlaceholder} />}
        isLoading={isLoading}
      >
        <FilterCollection.Hits
          searchableAttributes={['title', 'body']}
          collection={ads}
          hitComponent={AdItem}
          basePath={basePath}
          selected={selected}
          hitProps={{ getFirebasePath }}
        />
      </ScrollableList>
    </FilterCollection>
  );
};

AdsList.propTypes = {
  basePath: PropTypes.string.isRequired,
  selected: PropTypes.string,
  ads: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
  searchPlaceholder: PropTypes.string,
};

AdsList.defaultProps = {
  selected: null,
  ads: [],
  searchPlaceholder: 'Find ads',
};

export default withProps(
  createStructuredSelector({
    isLoading: R.complement(propSelector(['isLoaded'])),
    ads: R.compose(
      R.map(ad => deserializeAdSelector({ ad })),
      propSelector('ads'),
    ),
  }),
)(AdsList);
