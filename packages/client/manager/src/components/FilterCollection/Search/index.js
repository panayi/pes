import { isFunction } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withProps } from 'recompose';
import { actions, selectors } from 'store/filterCollection';
import SearchInput from '../SearchInput';
import withFilterCollectionId from '../withFilterCollectionId';

const mapStateToProps = createStructuredSelector({
  query: selectors.queryValueSelector,
});

const mapDispatchToProps = {
  setQuery: actions.setQuery,
};

export default compose(
  withFilterCollectionId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withProps(({ id, query, setQuery, onChange }) => ({
    value: query,
    onChange: event => {
      if (isFunction(onChange)) {
        onChange(event);
      }

      return setQuery(id, event.target.value);
    },
  })),
)(SearchInput);
