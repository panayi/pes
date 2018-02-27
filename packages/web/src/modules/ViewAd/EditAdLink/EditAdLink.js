/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withStyles } from 'material-ui/styles';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import propsSelector from '@pesposa/core/src/utils/propsSelector';
import { modals } from 'store/modals';
import requirePropToRender from 'hocs/requirePropToRender';
import withUserWithId from 'hocs/withUserWithId';

type Props = {
  adId: string,
  classes: Object,
};

const styles = theme => ({
  root: {
    minHeight: 'auto',
    minWidth: 'auto',
    padding: theme.spacing.unit,
  },
});

const EditAdButton = modals.editAd.showButton;

const EditAdLink = ({ adId, classes }: Props) => (
  <EditAdButton className={classes.root} color="primary" modalProps={{ adId }}>
    <ModeEditIcon />
  </EditAdButton>
);

export default R.compose(
  requirePropToRender('ad'),
  withUserWithId(R.compose(R.path(['ad', 'user']), propsSelector)),
  withStyles(styles),
)(EditAdLink);
