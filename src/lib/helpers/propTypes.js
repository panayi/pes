import PropTypes from 'prop-types';

export const authErrorPropType = PropTypes.shape({
  code: PropTypes.string,
  message: PropTypes.string,
});
