/* @flow */
import * as R from 'ramda';
import { mapProps } from 'recompose';
import Typography from 'material-ui/Typography';
import requirePropToRender from 'components/hocs/requirePropToRender';

type Props = {
  ad: Ad,
  getProp: Function,
};

// Low level component - DO NOT USE directly
// Instead define higher-level atoms like AdTitle, AdPrice, etc.
export default R.compose(
  requirePropToRender('ad'),
  mapProps(({ ad, getProp, ...rest }: Props) => ({
    children: getProp(ad),
    ...rest,
  })),
  requirePropToRender('children'),
)(Typography);
