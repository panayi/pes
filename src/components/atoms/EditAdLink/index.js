/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { replace as _replace } from 'react-router-redux';
import IconButton from 'material-ui/IconButton';
import propsSelector from 'utils/propsSelector';
import requirePropToRender from 'components/hocs/requirePropToRender';
import withUserWithId from 'components/hocs/withUserWithId';

type Props = {
  ad: Ad,
  adId: string,
  children: React$Node,
  replace: Function,
};

const EditAdLink = ({ adId, children, replace, ...rest }: Props) => (
  <IconButton {...rest} onClick={() => replace(`/i/${adId}/edit`)}>
    {children}
  </IconButton>
);

const mapDispatchToProps = {
  replace: _replace,
};

export default R.compose(
  requirePropToRender('ad'),
  withUserWithId(R.compose(R.path(['ad', 'user']), propsSelector)),
  connect(null, mapDispatchToProps),
)(EditAdLink);
