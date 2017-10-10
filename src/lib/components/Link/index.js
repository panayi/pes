import * as R from 'ramda';
import { Link as RebassLink, NavLink as RebassNavLink } from 'rebass';
import { NavLink as RouterNavlink } from 'react-router-dom';
import { defaultProps, withProps } from 'recompose';
import styled from 'styled-components';
import generateClassName from '../../helpers/generateClassName';

const DEFAULT_ACTIVE_CLASS_NAME = generateClassName();

const base = R.compose(
  defaultProps({
    activeClassName: DEFAULT_ACTIVE_CLASS_NAME,
  }),
  withProps(({ to }) => ({
    is: to ? RouterNavlink : null,
  })),
);

const Link = base(styled(RebassLink)`
  &.${R.prop('activeClassName')} {
    color: red;
  }
`);

Link.Nav = base(RebassNavLink);

export default Link;
