import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { constants as searchConstants } from '../../../store/search';

export default class SearchProvider extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  static childContextTypes = {
    [searchConstants.CONTEXT_SEARCH_ID_KEY]: PropTypes.string.isRequired,
  };

  getChildContext() {
    return {
      [searchConstants.CONTEXT_SEARCH_ID_KEY]: this.props.id,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
