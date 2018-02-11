import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'multireducer';
import { getContext } from 'recompose';
import { constants as searchConstants } from 'store/search';

const createMapStateToProps = mapStateToProps => {
  if (!R.is(Function, mapStateToProps)) {
    return mapStateToProps;
  }

  return (state, props) => {
    const searchId = props[searchConstants.CONTEXT_SEARCH_ID_KEY];
    const searchState = R.path([searchId, searchConstants.ROOT_KEY], state);
    const finalState = R.assoc(searchConstants.ROOT_KEY, searchState, state);

    return mapStateToProps(finalState, props);
  };
};

const mapDispatchToProps = actionsObj => {
  if (R.isNil(actionsObj)) {
    return null;
  }

  return (dispatch, props) => {
    const searchId = props[searchConstants.CONTEXT_SEARCH_ID_KEY];

    return bindActionCreators(actionsObj, dispatch, searchId);
  };
};

const connectSearch = (mapStateToProps, actionsObj) =>
  R.compose(
    getContext({
      [searchConstants.CONTEXT_SEARCH_ID_KEY]: PropTypes.string.isRequired,
    }),
    connect(
      createMapStateToProps(mapStateToProps),
      mapDispatchToProps(actionsObj),
    ),
  );

export default connectSearch;
