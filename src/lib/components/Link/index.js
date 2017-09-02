import R from 'ramda';
import { Link } from 'rebass';
import { NavLink as RouterLink } from 'react-router-dom';
import { defaultProps, withProps } from 'recompose';
import styled from 'styled-components';
import generateClassName from '../../helpers/generateClassName';

const DEFAULT_ACTIVE_CLASS_NAME = generateClassName();

export default R.compose(
  defaultProps({
    activeClassName: DEFAULT_ACTIVE_CLASS_NAME,
  }),
  withProps(({ to }) => ({
    is: to ? RouterLink : null,
  })),
)(styled(Link)`
  &.${R.prop('activeClassName')} {
    color: red;
  }
`);
