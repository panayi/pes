/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import { selectors as imagesSelectors } from 'store/images';
import Imgix from 'components/Imgix/Imgix';

type Props = {
  ad: Object,
  adThumbnail: Object,
  classes: Object,
};

const AD_THUMBNAIL_WIDTH = 40;
const AD_THUMBNAIL_HEIGHT = 40;

const styles = theme => ({
  root: {
    display: 'flex',
    flex: [0, 0, `${AD_THUMBNAIL_WIDTH}px`],
    width: AD_THUMBNAIL_WIDTH,
    height: AD_THUMBNAIL_HEIGHT,
    overflow: 'hidden',
    borderRadius: theme.borderRadius.md,
  },
});

const AdThumbnail = ({ ad, adThumbnail, classes }: Props) => (
  <div className={classes.root}>
    {adThumbnail && (
      <Imgix
        image={adThumbnail}
        params={{ w: AD_THUMBNAIL_WIDTH, h: AD_THUMBNAIL_HEIGHT, fit: 'edges' }}
        alt={ad.title}
      />
    )}
  </div>
);

export default R.compose(
  withProps(
    createStructuredSelector({
      adThumbnail: imagesSelectors.adFirstImageSelector,
    }),
  ),
  withStyles(styles),
)(AdThumbnail);
